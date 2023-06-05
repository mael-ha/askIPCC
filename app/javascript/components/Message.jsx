import React from "react";

function Message({ lastMessage, role, content }) {
  return (
    <div
      class={`flex w-full items-start justify-start ${
        lastMessage ? "" : "border-b border-gray-800  pb-4"
      } border-gray-800 gap-4`}
    >
      <div className="text-xl">{role == "user" ? "🧐" : "🤖"}</div>
      <div className="font-light grow">{content}</div>
    </div>
  );
}

export default Message;
