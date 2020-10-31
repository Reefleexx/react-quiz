import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import axios from 'axios'

class QuizList extends Component {

    QuizRender = () => {
        const list = [1, 2, 3]
        return (
            list.map((quiz, index) => {
                return (
                    <li key={index}>
                        <NavLink to={'/quiz/' + quiz}>Test {quiz}</NavLink>
                    </li>
                )
            })
        )
    }

    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList</h1>
                    <ul>
                        {this.QuizRender()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default QuizList