require 'combine_pdf'

class PdfService
  def initialize(path_to_file:)
    @path_to_file = path_to_file
    @file_name = @path_to_file.split('/').last.sub('.pdf', '')
    @folder_path = @path_to_file.split('/')[0..-2].join('/')
  end

  def split
    pages = CombinePDF.load(@path_to_file).pages
    pages_path = []
    pages.each_with_index do |page, index|
      pdf = CombinePDF.new
      pdf << page
      page_path = "#{@folder_path}/#{@file_name}_page_#{index + 1}.pdf"
      pdf.save(page_path)
      pages_path << page_path
    end
    pages_path
  end

  def has_multiple_pages?
    CombinePDF.load(@path_to_file).pages.size > 1
  end
end
