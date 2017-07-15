import * as React from "react";
import { observer } from "mobx-react";
import TodoList from "../components/todo-list";

import "../styles/index.less";

@observer
export default class HomeComponent extends React.Component<any, any> {
	public render () {
		return (
			<div>
				<h2>Home</h2>

				<TodoList />
			</div>
		);
	}
}

