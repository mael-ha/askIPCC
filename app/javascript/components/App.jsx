import React from "react";
import ReactDOM from "react-dom";
import ChatContainer from "./ChatContainer";

function App({ cable }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-0.5 bg-black bg-opacity-30 backdrop-blur">
      <div className="flex items-center justify-between gap-2 font-thin text-white sm:w-1/2 lg:min-w-1/3">
        <h1 className="text-6xl">Ask books</h1>
        <div className="flex items-end justify-center h-full">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="px-2 py-1 text-xs text-center bg-black rounded-tl">
              Currently
            </div>
            <div className="px-2 py-1 text-xs text-center bg-black rounded-tr">
              Upcoming
            </div>
            <div className="px-2 text-lg text-center bg-black rounded-bl">
              🥸 Marx
            </div>
            <div className="px-2 text-lg text-center bg-black rounded-br">
              ⏳ 👀
            </div>
          </div>
        </div>
      </div>
      <ChatContainer cable={cable} />
    </div>
  );
}
export default App;
