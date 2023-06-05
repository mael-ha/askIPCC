namespace :ipcc do
  task upload_to_pinecone: :environment do
    count = 0
    Dir.glob(Rails.root.join('public/ipcc', '*.pdf')).each do |path_to_file|
      start = Time.current
      LangchainService.new.add_data(path_to_file:)
      finish = Time.current
      count += 1
      puts "🎉 Added #{count} .pdf toto Pinecone in #{finish - start} seconds."
    end
  end
end
