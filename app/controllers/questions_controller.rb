class QuestionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    question = Question.create!(question_params)
    answer = LangchainService.new.ask(question:)
    render json: { type: 'answer', content: answer.content }
  end

  def question_params
    params.require(:question).permit(:content)
  end
end
