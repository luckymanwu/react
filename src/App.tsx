import * as React from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Config } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Spin } from "antd";
import axios from "axios"
import './App.css'
declare const window: any;


export const App = () => {
  axios.defaults.withCredentials = true
  return (
    <React.Fragment>
      <Provider store={store}>
        <React.Suspense fallback={<Spin />}>
          <HashRouter>{renderRoutes(Config)}</HashRouter>
        </React.Suspense>
      </Provider>
      </React.Fragment>
  
  );
};
