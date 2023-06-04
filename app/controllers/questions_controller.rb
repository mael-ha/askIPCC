class QuestionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    question = Question.create!(question_params)
    answer = Answer.new(
      question:,
      content: 'what an answer'
    )
    render json: { type: 'answer', content: answer.content }
  end

  def question_params
    params.require(:question).permit(:content)
  end
end
