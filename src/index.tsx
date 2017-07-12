import * as React from "react";
import { render } from "react-dom";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";

import Frame from "./components/frame";
import Home from "./pages/home";

const App = () => (
	<Router>
			<Frame>
				<Route exact path="/" component={Home}/>
			</Frame>
	</Router>
);

render(<App />, document.getElementById("main"));
