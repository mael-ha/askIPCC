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
    start = Time.current
    Dir.glob(Rails.root.join('public/marx', '*.pdf')).each do |path_to_file|
      next if path_to_file.include?('processed_')

      file_name = path_to_file.split('/').last
      folder_path = path_to_file.split('/')[0..-2].join('/')
      puts "📖 Processing #{file_name}..."
      if PdfService.new(path_to_file:).has_multiple_pages?
        pages = PdfService.new(path_to_file:).split
        processed_path = "#{folder_path}/processed_#{file_name}"
        File.rename(path_to_file, processed_path)
        puts "  → splitted into #{pages.length} pages..."
        pages.each do |page_path|
          puts "  🌲 vectorizing and uploading #{page_path.split('/').last} to Pinecone..."
          LangchainService.new.add_data(path_to_file: page_path)
          File.delete(page_path)
        end
      else
        puts "  🌲 vectorizing and uploading #{path_to_file.split('/').last} to Pinecone..."
        LangchainService.new.add_data(path_to_file:)
        File.delete(path_to_file)
      end
      puts "✅ Processed #{file_name}"
      count += 1
    end
    finish = Time.current
    puts "🎉 Added #{count} .pdf to Pinecone in #{finish - start} seconds."
  end
end
