import React, { useState, useEffect } from "react";
import UserInput from "./UserInput";
import MessagesContainer from "./MessagesContainer";

function ChatContainer({ cable }) {
  const system_question = {
    content: "Hi, how can I help you?",
    role: "assistant",
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
        setAnswer({ content: data.content, role: "assistant" });
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
    setQuestion({ role: "user", content: content });
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
    <div className="flex flex-col items-center justify-center w-full p-6 text-white bg-black border border-gray-900 rounded-lg min-h-max sm:w-1/2 lg:min-w-1/3">
      <MessagesContainer isLoading={isReceiving} messages={messages} />
      <UserInput
        onSubmit={submitQuestion}
        isDisabled={isSubmitting || isReceiving}
      />
    </div>
  );
}

export default ChatContainer;
