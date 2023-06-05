// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("ws://localhost:3000/cable");
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App cable={cable} />);
import "./channels";
