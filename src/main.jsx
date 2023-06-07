import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter as Router} from "react-router-dom";
import configureAxios from "./utils/configureAxios";
import { createBrowserHistory } from "history";

configureAxios();

export const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>
);
