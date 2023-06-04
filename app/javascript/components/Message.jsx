import React from "react";

function Message({ type, content }) {
    return <p><b>{type}:</b> {content}</p>;
  }
  
export default Message;