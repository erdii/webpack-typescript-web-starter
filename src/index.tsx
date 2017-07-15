// import polyfills here before all other imports
import "es6-promise/auto"; // Promise
import "whatwg-fetch"; // fetch

// other imports
import * as React from "react";
import { render } from "react-dom";
import App from "./components/app";

render(<App />, document.getElementById("main"));
