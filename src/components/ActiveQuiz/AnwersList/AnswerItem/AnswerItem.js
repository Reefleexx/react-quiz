import React from "react";
import classes from "./AnswerItem.module.scss"

const AnswerItem = (props) => {
    const cls = [classes.answerItem];

    if (props.answerState) {
        cls.push(classes[props.answerState[props.answer.id]])
    }

    return (
        <li className={cls.join(' ')} onClick={props.onAnswerClick.bind(this, props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswerItem