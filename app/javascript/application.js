// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { createConsumer } from "@rails/actioncable";

if (window.location.hostname === "localhost") {
  cableURL = "ws://localhost:3000/cable";
} else {
  cableURL = `wss://${window.location.hostname}/cable`;
}

const cable = createConsumer(cableURL);
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App cable={cable} />);
import "./channels";
