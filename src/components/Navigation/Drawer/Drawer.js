import React from "react";
import classes from "./Drawer.module.scss"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Drawer extends React.Component {

    renderMenu = (links) => {
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

        let links = [
            {to: '/', name: 'List of test', exact: true}
        ]

        if (this.props.isAuth) {
            links.push({to: '/quiz-creator', name: 'Create a new test', exact: false})
            links.push({to: '/logOut', name: 'Log out', exact: false})
        } else {
            links.push({to: '/auth', name: 'Sign up', exact: false})
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderMenu(links)}
                    </ul>
                </nav>
                { this.props.open ? <Backdrop OnClose={this.props.OnClose}/> : null}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Drawer);