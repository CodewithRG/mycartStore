import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import {positions, transitions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from "react-alert-template-basic"
// import reportWebVitals from './reportWebVitals';
// import webpackConfig from "../webpack.config";

const options = {
  timeout:5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
  </Provider>
);

// reportWebVitals();
// webpackConfig();