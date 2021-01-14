import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import {createControl, isValid} from "../../form/formFramework"
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {onAddQuiz, onSubmitQuiz, quizDelete} from "../../redux/actions/quizCreate";

class QuizCreator extends Component {

    componentWillUnmount() {
        this.props.quizDelete()
    }

    state = {
        rightValue: 1,
        valid: false,
        title: createControl({
                label: "Add the title of hole test",
                errorMassage: "Question can't be empty"},
            {required: true}
        ),
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
        this.props.onSubmitQuiz(this.state.title.value, this.props.quiz)

        this.setState({
            title: createControl({
                    label: "Add the title of hole test",
                    errorMassage: "Question can't be empty"},
                {required: true}
            ),
            formControls: createFormControl(),
            valid: false
        })
    }

    onSelectChange = (event) => {
        this.setState({
            rightValue: +event.target.value
        })
    }

    allValidCheck = () => {
        let forms = this.state.formControls

        let allValid = true

        for(let control in forms) {
            allValid = forms[control].valid && allValid
        }

        this.setState({
            valid: allValid
        })
    }

    onInputChange = (value, curInput) => {
        let forms = {...this.state.formControls}
        let form = forms[curInput]

        form.touched = true
        form.value = value
        form.valid = isValid(value, form.validation)

        this.setState({
            formControls: forms,
        })

        // this.setState({
        //     formControls: {...this.state.formControls, [e.target.name]: e.target.value}
        // })

        this.allValidCheck()
    }

    onTitleChange = (value) => {
        const title = {...this.state.title}

        title.touched = true
        title.value = value
        title.valid = isValid(value, title.validation)

        this.setState({
            title: title
        })
    }

    renderTitle = () => {

        const title = this.state.title

        return (
            <React.Fragment key={`title21312313`}>
                <Input
                    value={title.value}
                    type={"text"}
                    isTouched={title.touched}
                    valid={title.valid}
                    errorMessage={title.errorMessage}
                    label={title.label}
                    onChange={event => this.onTitleChange(event.target.value)}
                />
                <hr/>
            </React.Fragment>
        )
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
                </React.Fragment>
            )
        })
    }

    isDis = () => {
        if (this.state.title.valid){
            if (this.props.quiz.length > 0) return false
        }
        return true
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

                        {this.renderTitle()}

                        { this.renderInputs()}

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
                            disabled={this.isDis()}
                        >
                            Confirm this quiz
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}


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

function mapStateToProps (state) {
    return {
        quiz: state.create.quizes
    }
}

function mapDispatchToProps (dispatch) {
    return {
        onAddQuiz: (quiz) => dispatch(onAddQuiz(quiz)),
        onSubmitQuiz: (title, quiz) => dispatch(onSubmitQuiz(title, quiz)),
        quizDelete: () => dispatch(quizDelete())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)