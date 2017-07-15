import * as React from "react";
import { action, observable, computed } from "mobx";
import { observer } from "mobx-react";


class Todo {
	@observable public done: boolean = false;
	@observable public text: string;
	public readonly id: string;

	constructor(text: string, done: boolean = false) {
		this.id = (Date.now() + Math.random()).toString(36);
		this.text = text;
		this.done = done;
	}
}

@observer
export default class TodoList extends React.Component<any, any> {
	@observable private todos = [
		new Todo("Hot Module Reloading"),
		new Todo("CSS Solution"),
		new Todo("store structure?"),
		new Todo("grok mobx", true),
	];

	private dropdownEl: any;
	private inputEl: HTMLInputElement;

	@observable private filter: "all"|"todo"|"done" = "all";

	@computed private get filteredTodos() {
		switch (this.filter) {
			case "all": return this.todos;
			case "todo": return this.todos.filter(todo => !todo.done);
			case "done": return this.todos.filter(todo => todo.done);
		}
	}

	public render () {
		return (
			<div>
				<input ref={el => this.inputEl = el} onKeyDown={this.handleKeyDown} />
				<button onClick={this.handleClick}>Add</button>

				<h4>Todo:</h4>

				<select
					ref={el => this.dropdownEl = el}
					onChange={() => this.filter = this.dropdownEl.value}>
					<option value="all">Alle</option>
					<option value="todo">Todo</option>
					<option value="done">Fertig</option>
				</select>

				<ul>
					{this.filteredTodos.map(todo => (
						<li key={todo.id} onClick={() => todo.done = !todo.done}>
							{
								todo.done
									? <s>{ todo.text }</s>
									: todo.text
							}
						</li>
					))}
				</ul>
			</div>
		);
	}

	@action
	private handleClick = (event: any) => {
		const { value } = this.inputEl;

		if (value) {
			this.todos.push(
				new Todo(value)
			);

			this.inputEl.value = "";
		}
	}

	private handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			this.handleClick(event);
		}
	}
}

