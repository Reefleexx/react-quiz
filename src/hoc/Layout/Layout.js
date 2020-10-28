import React from "react";
import classes from './Layout.module.scss'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends React.Component {

    state = {
        open: false
    }

    MenuToggleHandler = () => {
        this.setState({
            open: !this.state.open
        })
    }

    MenuClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div className={classes.layout}>


                <MenuToggle
                    onClick={this.MenuToggleHandler}
                    open={this.state.open}
                />

                <Drawer
                    open={this.state.open}
                    OnClose={this.MenuClose}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;