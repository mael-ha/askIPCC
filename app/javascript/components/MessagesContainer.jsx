import React from "react";
import Message from "./Message";

function MessagesContainer({ messages }) {
    return(
        <div className="text-white bg-black">
            {messages.map((message, index) => (
                <Message key={index} type={message.type} content={message.content} />
            ))}
        </div>
    );
  }
  
export default MessagesContainer;