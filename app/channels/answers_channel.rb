class AnswersChannel < ApplicationCable::Channel
  def subscribed
    # connects the client to the server
    stop_all_streams
    stream_from 'AnswersChannel'
  end

  def unsubscribed
    stop_all_streams
  end
end
