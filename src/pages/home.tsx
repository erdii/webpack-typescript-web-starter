import * as React from "react";
import { observer } from "mobx-react";
import TodoList from "../components/todo-list";

import "../styles/index.less";

@observer
export default class HomePage extends React.Component<any, any> {
	public render () {
		return (
			<div>
				<h2>Home</h2>

				TODO: a list of boilerplate features and stuff
			</div>
		);
	}
}

