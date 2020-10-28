import React from "react";
import classes from "./Drawer.module.scss"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', name: 'List of test', exact: true},
    {to: '/quiz-creator', name: 'Create a new test', exact: false},
    {to: '/auth', name: 'Sign up', exact: false}
]

class Drawer extends React.Component {

    renderMenu = () => {
        return (
            links.map((el, index) => {
                return (
                    <li key={index}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <NavLink
                            to={el.to}
                            exact={el.exact}
                            onClick={this.props.OnClose}
                        >
                            {el.name}
                        </NavLink>
                    </li>
                )
            })
        )
    }

    render() {

        const cls = [
            classes.drawer,
            !this.props.open ? classes.close : ''
        ]

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderMenu()}
                    </ul>
                </nav>
                { this.props.open ? <Backdrop OnClose={this.props.OnClose}/> : null}
            </>
        )
    }
}

export default Drawer;