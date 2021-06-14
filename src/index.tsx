import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

function renderer(Elm: React.ReactElement) {
	ReactDOM.render(Elm, document.getElementById("root"));
  }
  renderer(<App />);

  if (module.hot) {
    module.hot.accept("./App", () => {
      import("./App").then(NextApp => renderer(<NextApp.App />));
    });
  }