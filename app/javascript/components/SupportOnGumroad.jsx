import React from "react";

function SupportOnGumroad({ lastMessage, role, content }) {
  return (
    <div className="">
      <a
        href="https://maelus.gumroad.com/l/askmarx"
        className="p-1 px-2 font-thin text-center text-white bg-black rounded-b bg-opacity-30 hover:bg-black hover:scale-110"
        target="_blank"
      >
        Support the project on Gumroad 🫶
      </a>
    </div>
  );
}

export default SupportOnGumroad;
