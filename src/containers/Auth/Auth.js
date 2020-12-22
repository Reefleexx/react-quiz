import React, {Component} from 'react'
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import is from 'is_js'
import {connect} from 'react-redux'
import {fetchAuth} from "../../redux/actions/auth";


class Auth extends Component {

    state = {
        isFormValid: false,
        forms: {
            email: {
                type: 'email',
                label: 'Email',
                valid: false,
                value: '',
                touched: false,
                errorMessage: 'Invalid email address',
                validation: {
                    email: true,
                    required: true
                }
            },
            password: {
                type: 'password',
                label: 'Password',
                valid: false,
                value: '',
                touched: false,
                errorMessage: 'Password is incorrect',
                validation: {
                    minLength: 6,
                    required: true
                }
            }
        }
    }

    loginHandler = (e) => {
        e.preventDefault()
        const forms = this.state.forms

        this.props.fetchAuth({
            email: forms.email.value,
            password: forms.password.value,
            returnSecureToken: true
        }, true)

    }

    regHandler = (e) => {
        e.preventDefault()
        const forms = this.state.forms

        this.props.fetchAuth({
            email: forms.email.value,
            password: forms.password.value,
            returnSecureToken: true
        }, false)
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    isValid = (value, validations) => {
        let isValid = true

        if(validations.required) {
            isValid = value.trim() !== ""
        }

        if(validations.email) {
            isValid = is.email(value) && isValid
        }

        if(validations.minLength){
            isValid = value.length >= validations.minLength && isValid
        }

        return isValid

    }

    onChangeHandler = (event, curForm) => {
        const forms = {...this.state.forms}
        const form = {...forms[curForm]}

        form.value = event.target.value
        form.touched = true
        form.valid = this.isValid(form.value, form.validation)

        let isFormValid = true

        Object.keys(forms).forEach((form) => {
            isFormValid = forms[form].valid && isFormValid
        })

        forms[curForm] = form
        this.setState({
            forms, isFormValid
        })
    }

    renderInputs = () => {
       return (
           Object.keys(this.state.forms).map((curForm, index) => {
               const form = this.state.forms[curForm]
               return (
                   <Input
                       key={index}
                       type={form.type}
                       label={form.label}
                       value={form.value}
                       isTouched={form.touched}
                       valid={form.valid}
                       errorMessage={form.errorMessage}
                       onChange={event => this.onChangeHandler(event, curForm)}
                   />
               )
           })
       )
    }

    render() {
        return(
            <div className={classes.Auth}>
                <h1>Authentication</h1>

                <form onSubmit={this.submitHandler}>

                    {this.renderInputs()}

                    <Button
                        type={'success'}
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Sign In
                    </Button>

                    <Button
                        type={'main'}
                        onClick={this.regHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAuth: (authForm, type) => dispatch(fetchAuth(authForm, type))
    }
}

export default connect(null, mapDispatchToProps)(Auth)