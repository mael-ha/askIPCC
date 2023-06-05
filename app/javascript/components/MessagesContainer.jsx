import React from "react";
import Message from "./Message";

function MessagesContainer({ isLoading, messages }) {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-4 pb-4">
      {messages.map((message, index) => (
        <Message
          key={index}
          role={message.role}
          content={message.content}
          lastMessage={index + 1 == messages.length}
        />
      ))}
      {isLoading && <p className="flex items-center justify-center w-8 h-8 text-xl animate-spin">🌏</p>}
    </div>
  );
}

export default MessagesContainer;
