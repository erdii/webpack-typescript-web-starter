import * as React from "react";
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import { observer } from "mobx-react";

import Frame from "./frame";
import Home from "../pages/home";

@observer
export default class App extends React.Component<any, any> {
	public render() {
		return (
			<Router>
					<Frame>
						<Route exact path="/" component={Home}/>
					</Frame>
			</Router>
		);
	}
}
