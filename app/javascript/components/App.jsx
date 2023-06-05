import React from "react";
import ReactDOM from "react-dom";
import ChatContainer from "./ChatContainer";

function App({ cable }) {
  return (
    <div className="">
      <h1>Hello World!</h1>
      <ChatContainer cable={cable} />
    </div>
  );
}

export default App;
