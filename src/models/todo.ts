import { observable, computed } from "mobx";

export default class TodoModel {
	@observable public done: boolean = false;
	@observable public text: string;
	public readonly id: string;

	constructor(text: string, done: boolean = false) {
		this.id = (Date.now() + Math.random()).toString(36);
		this.text = text;
		this.done = done;
	}
}
