import React from "react";
import classes from "./ActiveQuiz.module.scss"
import AnswersList from "./AnwersList/AnswersList";

const ActiveQuiz = (props) => {
    return (
        <div className={classes.activeQuiz}>
            <p className={classes.question}>
                <span>
                    <strong>2</strong>. {props.question.question}
                </span>
                <small style={{"fontWeight": 500}}>{props.numPage} of {props.pageCount}</small>
            </p>

            <AnswersList
                answers={props.question.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
            />

        </div>
    )
}

export default ActiveQuiz