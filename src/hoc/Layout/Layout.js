import React, {useState} from "react";
import classes from './Layout.module.scss'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

function Layout (props) {

    const [open, changeOpen] = useState(false)

    const MenuToggleHandler = () => {
        changeOpen(!open)
    }

    const MenuClose = () => {
        changeOpen(false)
    }

    return (
        <div className={classes.layout}>

            <MenuToggle
                onClick={MenuToggleHandler}
                open={open}
            />

            <Drawer
                open={open}
                OnClose={MenuClose}
            />
            <main>
                {props.children}
            </main>
        </div>
    )

}

export default Layout;