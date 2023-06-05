require 'langchain'
require 'baran'

class LangchainService
  def initialize(index_name: 'testipcc', chunk_size: 1024, chunk_overlap: 64)
    @llm_client = Langchain::LLM::OpenAI.new(api_key: ENV['OPENAI_API_KEY'])
    @vector_search_client = Langchain::Vectorsearch::Pinecone.new(
      environment: ENV['PINECONE_ENVIRONMENT'],
      api_key: ENV['PINECONE_API_KEY'],
      index_name:,
      llm: @llm_client
    )
    @splitter = Baran::CharacterTextSplitter.new(
      chunk_size:,
      chunk_overlap:
    )
    @openai = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  end

  # get answer from LLM using context from vector search
  def ask(question:, number_of_results: 6)
    context = get_context(question: question.content, number_of_results:)
    prompt = @vector_search_client.generate_prompt(question: question.content, context:)

    content = ''
    @llm_client.chat(prompt:, stream: true) do |new_content|
      content += new_content if new_content
      ActionCable.server.broadcast('AnswersChannel', { content:, streamStopped: new_content ? false : true })
    end
    Answer.create!(
      question:,
      context:,
      content:
    )
  end

  # init vector search index
  def create_vector_search_index
    @vector_search_client.create_default_schema
  end

  # add data to vector search index
  def add_data(path_to_file:)
    start = Time.current
    path = Rails.root.join(path_to_file)
    return unless File.exist?(path)

    data = File.open(path).read
    pages = parse(data)

    vectors_count = create_vectors_and_upload(pages)
    finish = Time.current
    puts "✔ Added #{path_to_file} w/ #{vectors_count} vectors to Pinecone in #{finish - start} seconds."
  end

  private

  def parse(data)
    reader = ::PDF::Reader.new(StringIO.new(data))
    puts "- Parsing data: #{reader.pages.size} pages..."
    n = 0
    reader.pages.map do |page|
      # return an array of texts from the page
      next if page.text.size < 100
      @splitter.chunks(page.text).map { _1[:text] }
    end
  end

  def create_vectors_and_upload(pages)
    puts '- Adding data to vector search index...'
    vectors = 0
    pages.each_with_index do |page_chunks, index|
      @vector_search_client.add_texts(texts: page_chunks)
      vectors += page_chunks.size
      puts "  - pages #{index + 1}, #{page_chunks.size} vectors | total: #{vectors} vectors"
    end
    vectors
  end

  def get_context(question:, number_of_results:)
    search_results = @vector_search_client.similarity_search(query: question, k: number_of_results)

    context = search_results.map do |result|
      result['metadata']&.to_s
    end
    context.join("\n---\n")
  end
end
