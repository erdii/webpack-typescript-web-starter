import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";

interface INavBarProps {
}

export class NavBar extends React.Component<INavBarProps, any> {
	public render() {
		return (
			<nav className="nav">
				<NavLink exact to="/">Home</NavLink>
				<NavLink to="/todo">Todo-List</NavLink>
			</nav>
		);
	}
}

interface INavLinkProps {
	to: string;
	children: any;
	[propName: string]: any;
}

export class NavLink extends React.Component<INavLinkProps, any> {
	public render() {
		const { to, children, ...props } = this.props;

		return (
				<RouterLink to={to} {...props}>
					<div className="link">
					{children}
					</div>
				</RouterLink>
		);
	}
}
