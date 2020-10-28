import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";

class QuizCreator extends Component {

    onSubmitHandler = (event) => {
        event.preventDefault();
    }

    onAddHandler = () => {

    }

    onConfirmHandler = () => {

    }

    render() {
        return(
            <div className={classes.QuizCreator}>
                <div className={classes.Wrapper}>
                    <h1>QuizCreator</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <input type="text"/>
                        <hr/>
                        <select>d</select>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <Button
                            type={'main'}
                            onClick={this.onAddHandler}
                        >
                            Add new one
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.onConfirmHandler}
                        >
                            Confirm this quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator