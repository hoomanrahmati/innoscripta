import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import axios from "axios";

// const apiKey = "85c90a183f624d0780198b8dd95fb124";
const apiKey = "2caf759cb201475f9ecb879c589808a0";
axios.defaults.headers.common["Authorization"] = apiKey;
axios.defaults.baseURL = "https://newsapi.org/v2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
