import React from "react";
import ReactDOM from "react-dom";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import Footer from "./Footer";
import SupportOnGumroad from "./SupportOnGumroad";

function App({ cable }) {
  return (
    <div className="px-6 flex flex-col items-center justify-center w-full h-full gap-0.5 bg-black bg-opacity-30 backdrop-blur">
      <ChatHeader />
      <ChatContainer cable={cable} />
      <SupportOnGumroad />
      <Footer />
    </div>
  );
}
export default App;
