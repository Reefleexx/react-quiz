import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import {createControl, isValid} from "../../form/formFramework"
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {onAddQuiz, onSubmitQuiz, quizDelete} from "../../redux/actions/quizCreate";

function createOptionControl(number) {
    return (
        createControl({
            label: `Option ${number}`,
            errorMessage: "Option can't be empty",
            id: number
        }, {required: true})
    )
}

function createFormControl () {
    return (
        {
            question: createControl({
                    label: "Add the question",
                    errorMassage: "Question can't be empty"},
                {required: true}
            ),
            option1: createOptionControl(1),
            option2: createOptionControl(2),
            option3: createOptionControl(3),
            option4: createOptionControl(4)
        }
    )
}

class QuizCreator extends Component {

    componentWillUnmount() {
        this.props.quizDelete()
    }

    state = {
        rightValue: 1,
        valid: false,
        formControls: createFormControl()
    }

    onAddHandler = (e) => {
        e.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls
        const index = this.props.quiz.length + 1

        const quizItem = {
            id: index,
            rightAnswer: this.state.rightValue,
            question: question.value,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}

            ]
            }

        this.props.onAddQuiz(quizItem)

        this.setState({
            formControls: createFormControl(),
            valid: false
        })
    }

    onSubmitQuiz = (e) => {
        e.preventDefault()
        this.props.onSubmitQuiz()
    }

    onInputChange = (value, curInput) => {
        let forms = {...this.state.formControls}
        let form = forms[curInput]

        form.touched = true
        form.value = value
        form.valid = isValid(value, form.validation)

        let allValid = true

        for(let control in forms) {
            allValid = forms[control].valid && allValid
        }

        this.setState({
            formControls: forms,
            valid: allValid
        })
    }

    onSelectChange = (event) => {
        this.setState({
            rightValue: +event.target.value
        })
    }

    renderInputs = () => {
        const forms = this.state.formControls

        return Object.keys(forms).map((input, index) => {
            const curInput = forms[input]
            return (
                <React.Fragment key={index}>
                    <Input
                        value={curInput.value}
                        type={"text"}
                        isTouched={curInput.touched}
                        valid={curInput.valid}
                        errorMessage={curInput.errorMessage}
                        label={curInput.label}
                        onChange={event => this.onInputChange(event.target.value, input)}
                    />
                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            )
        })
    }

    render() {
        const select = <Select
            value={this.state.rightValue}
            label={'Right answer'}
            onChange={this.onSelectChange}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return(
            <div className={classes.QuizCreator}>
                <div className={classes.Wrapper}>
                    <h1>QuizCreator</h1>
                    <form onSubmit={this.props.onSubmitQuiz}>

                        { this.renderInputs() }

                        {select}
                        <Button
                            type={'main'}
                            onClick={this.onAddHandler}
                            disabled={!this.state.valid}
                        >
                            Add new question
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.onSubmitQuiz}
                            disabled={this.props.quiz.length === 0}
                        >
                            Confirm this quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        quiz: state.create.quizes
    }
}

function mapDispatchToProps (dispatch) {
    return {
        onAddQuiz: (quiz) => dispatch(onAddQuiz(quiz)),
        onSubmitQuiz: () => dispatch(onSubmitQuiz()),
        quizDelete: () => dispatch(quizDelete())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)