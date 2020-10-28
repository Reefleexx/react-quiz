import React from "react";
import classes from "./MenuToggle.module.scss"

const MenuToggle = (props) => {

    const cls = [
        classes.menuToggle,
        'fa'
    ]

    if (props.open) {
        cls.push('fa-times')
        cls.push(classes.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i className={cls.join(' ')} onClick={props.onClick}/>
    )
}

export default MenuToggle;