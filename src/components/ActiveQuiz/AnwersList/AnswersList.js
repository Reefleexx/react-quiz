import React from "react";
import classes from "./AnswersList.module.scss"
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
    return (
        <div className={classes.answersList}>
            <ul>
                {
                    props.answers.map((answerItem, index) => {
                        return (
                            <AnswerItem
                                key={index}
                                answer={answerItem}
                                onAnswerClick={props.onAnswerClick}
                                answerState={props.answerState ? props.answerState : null}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default AnswersList;