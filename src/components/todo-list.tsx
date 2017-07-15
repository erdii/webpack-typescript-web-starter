import * as React from "react";
import { action, observable, computed, reaction } from "mobx";
import { observer } from "mobx-react";
import { TransitionGroup } from "react-transition-group";
import TodoModel from "../models/todo";
import { Todo } from "./todo";

const storageKey = "todos";


@observer
export default class TodoList extends React.Component<any, any> {
	private dropdownEl: any;
	private inputEl: HTMLInputElement;

	@observable private todos = this.loadTodos();
	@observable private filter: "all"|"todo"|"done" = this.loadFilter();

	@computed private get filteredTodos() {
		switch (this.filter) {
			case "all": return this.todos;
			case "todo": return this.todos.filter(todo => !todo.done);
			case "done": return this.todos.filter(todo => todo.done);
		}
	}

	constructor(props) {
		super(props);

		reaction(
			() => this.todos.length,
			() => {
				this.persistTodos();
			}
		);

		reaction(
			() => this.filter,
			() => {
				this.persistFilter();
			}
		);
	}

	public render () {
		return (
			<div>
				<input ref={el => this.inputEl = el} onKeyDown={this.handleKeyDown} />
				<button onClick={this.handleClick}>Add</button>

				<h4>Todo:</h4>

				<select
					ref={el => this.dropdownEl = el}
					onChange={() => this.filter = this.dropdownEl.value}
					value={this.filter}
				>
					<option value="all">Alle</option>
					<option value="todo">Todo</option>
					<option value="done">Fertig</option>
				</select>

				<ul>
					<TransitionGroup>
						{this.filteredTodos.map(todo =>
							<Todo persist={this.persistTodos} key={todo.id} todo={todo} />
						)}
					</TransitionGroup>
				</ul>
			</div>
		);
	}

	private persistTodos = () => {
		localStorage.setItem(storageKey, JSON.stringify(this.todos));
	}

	private loadTodos(): TodoModel[] {
		const rawTodos: any[] = JSON.parse(localStorage.getItem(storageKey)) || [];
		return rawTodos.map(rawTodo => new TodoModel(rawTodo.text, rawTodo.done));
	}

	private persistFilter = () => {
		localStorage.setItem("filter", this.filter);
	}

	private loadFilter(): "all"|"todo"|"done" {
		console.log(localStorage.getItem("filter"));
		const result = localStorage.getItem("filter") as any || "all";
		console.log(result);
		return result;
	}

	@action
	private handleClick = (event: any) => {
		const { value } = this.inputEl;

		if (value) {
			this.todos.push(
				new TodoModel(value)
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

