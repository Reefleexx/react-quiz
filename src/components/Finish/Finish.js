import React from "react";
import classes from './Finish.module.scss'
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

class Finish extends React.Component {

    render() {
        const results = this.props.results
        const successCount = Object.keys(this.props.results).reduce((total, el) => {
            if(this.props.results[el] === 'success'){
                 total++
            }
            return total
        }, 0)
        return (
            <div className={classes.finish}>
                <ul>

                    { this.props.quiz.map((quizItem, index) => {

                        const cls = ['fa'];
                        results[index] === 'success' ?
                            cls.push('fa-check')
                            : cls.push('fa-times')

                        this.props.results[index] === 'error' ?
                            cls.push(classes[results[index]]) :
                            cls.push(classes[results[index]])

                        return (
                            <li key={index}>
                                <strong>{index + 1}. </strong>
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    }) }

                </ul>
                <p>
                    Right {successCount} from {this.props.quiz.length}
                </p>
                <Button
                    onClick={this.props.retryHandler}
                    type={'main'}
                >
                    Try again
                </Button>
                <Link to="/">
                    <Button
                        onClick={this.props.retryHandler}
                        type={'success'}
                    >
                        Go to list of quiz
                    </Button>
                </Link>
            </div>
        )
    }
}

export default Finish