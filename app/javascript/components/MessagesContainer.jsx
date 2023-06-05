import React from "react";
import Message from "./Message";

function MessagesContainer({ isLoading, messages }) {
  return (
    <div className="">
      {messages.map((message, index) => (
        <Message key={index} content={message.content} />
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default MessagesContainer;
