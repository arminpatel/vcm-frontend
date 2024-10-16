import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import configureAxios from "./utils/configureAxios";
import { createBrowserHistory } from "history";

configureAxios();

export const history = createBrowserHistory();

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>,
  );
}
