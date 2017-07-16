import * as React from "react";
import { NavBar } from "./nav-bar";

export default ({ children }) => (
	<div>
		<NavBar />

		<div>
			{ children }
		</div>
	</div>
);
