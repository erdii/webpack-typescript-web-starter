import * as React from "react";
import { observer } from "mobx-react";
import TodoList from "../components/todo-list";

@observer
export default class TodoPage extends React.Component<any, any> {
	public render () {
		return (
			<div>
				<h2>An example Todo List</h2>

				<TodoList />
			</div>
		);
	}
}

