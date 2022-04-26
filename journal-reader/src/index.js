import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const element = document.getElementsByClassName("uninitialized-op-widget")[0];
element.classList.remove("uninitialized-op-widget");
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App element={element} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
