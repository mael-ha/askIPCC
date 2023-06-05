import React from "react";
import ReactDOM from "react-dom";
import ChatContainer from "./ChatContainer";

function App({ cable }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-30 backdrop-blur">
      <h1 className="pb-4 text-5xl font-thin text-white">Ask IPCC 🌏</h1>
      <ChatContainer cable={cable} />
    </div>
  );
}

export default App;
