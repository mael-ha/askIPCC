class QuestionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    question = Question.create!(question_params)
    Async do
      LangchainService.new.ask(question:)
    end
    head :ok
  end

  def question_params
    params.require(:question).permit(:content)
  end
end
