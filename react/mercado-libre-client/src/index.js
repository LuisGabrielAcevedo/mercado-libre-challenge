import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

// 1. Service worker
import * as serviceWorker from "./serviceWorker";

// 2. Store
import { Provider } from "react-redux";
import store from "./store/store.index";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
