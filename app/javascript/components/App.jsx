import React from "react";
import ReactDOM from "react-dom";
import ChatContainer from "./ChatContainer";

function App({ cable }) {
  return (
    <div className="px-6 flex flex-col items-center justify-center w-full h-full gap-0.5 bg-black bg-opacity-30 backdrop-blur">
      <div className="flex items-center justify-between w-full gap-2 font-thin text-white sm:w-1/2 lg:min-w-1/3">
        <h1 className="text-3xl md:text-6xl">Ask books</h1>
        <div className="flex items-end justify-center h-full">
          <div className="px-2 text-lg text-center bg-black rounded">
            🥸 Karl Marx
          </div>
        </div>
      </div>
      <ChatContainer cable={cable} />
    </div>
  );
}
export default App;
