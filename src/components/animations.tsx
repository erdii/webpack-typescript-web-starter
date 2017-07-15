import * as React from "react";
import { CSSTransition } from "react-transition-group";

interface IFadeAnimationProps {
	[propName: string]: any;
}

export class FadeAnimation extends React.Component<IFadeAnimationProps, any> {
	public render() {
		const { children, ...props } = this.props;

		return (
			<CSSTransition
				{...props}
				timeout={500}
				appear
				classNames="fade"
			>
				{children}
			</CSSTransition>
		);
	}
}
