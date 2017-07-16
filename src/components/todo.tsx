import * as React from "react";
import TodoModel from "../models/todo";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import { FadeAnimation } from "./animations";

interface ITodoProps {
	todo: TodoModel;
	persist: () => void;
}

@observer
export class Todo extends React.Component<ITodoProps, any> {
	public render() {
		const { todo, persist, ...props } = this.props;

		return (
			<FadeAnimation
				{...props}
				timeout={250}
			>
				<li onClick={() => {
					todo.done = !todo.done;
					persist();
				}}>
					{
						todo.done
							? <s>{ todo.text }</s>
							: todo.text
					}
				</li>
			</FadeAnimation>
		);
	}
}
