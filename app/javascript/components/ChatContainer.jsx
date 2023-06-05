import React, { useState, useEffect } from "react";
import UserInput from "./UserInput";
import MessagesContainer from "./MessagesContainer";

function ChatContainer({ cable }) {
  const system_question = {
    content: "Hi, how can I help you?",
  };
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);

  const messages = [system_question, question, answer].filter(
    (message) => message !== null
  );

  useEffect(() => {
    const subscription = cable.subscriptions.create("AnswersChannel", {
      received(data) {
        setIsReceiving(false);
        setAnswer({ content: data.content });
        if (data.streamStopped) {
          setIsSubmitting(false);
        }
      },
    });
    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, []);

  const submitQuestion = async (content) => {
    setIsSubmitting(true);
    setIsReceiving(true);
    setQuestion({ type: "question", content: content });
    setAnswer(null);
    const response = await fetch("/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: { content: content } }),
    });
    if (response.ok) {
    }
  };

  return (
    <div>
      <MessagesContainer isLoading={isReceiving} messages={messages} />
      <UserInput
        onSubmit={submitQuestion}
        isDisabled={isSubmitting || isReceiving}
      />
    </div>
  );
}

export default ChatContainer;
