namespace :books do
  task upload_ipcc: :environment do
    count = 0
    Dir.glob(Rails.root.join('public/ipcc', '*.pdf')).each do |path_to_file|
      start = Time.current
      LangchainService.new.add_data(path_to_file:)
      finish = Time.current
      count += 1
      puts "🎉 Added #{count} .pdf to Pinecone in #{finish - start} seconds."
    end
  end
  task upload_marx: :environment do
    count = 0
    Dir.glob(Rails.root.join('public/marx', '*.pdf')).each do |path_to_file|
      start = Time.current
      LangchainService.new.add_data(path_to_file:)
      finish = Time.current
      count += 1
      puts "🎉 Added #{count} .pdf to Pinecone in #{finish - start} seconds."
    end
  end
end
