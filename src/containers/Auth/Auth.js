import React, {Component} from 'react'
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import is from 'is_js'
import {connect} from 'react-redux'
import {fetchAuth} from "../../redux/actions/auth";
import Error from "../../components/UI/Error/Error";

class Auth extends Component {

    state = {
        isFormValid: false,
        disabled: true,
        forms: {
            email: {
                type: 'email',
                label: 'Email',
                valid: false,
                value: '',
                touched: false,
                errorMessage: 'Invalid email address',
                isMessage: false,
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
                isMessage: false,
                validation: {
                    minLength: 6,
                    required: true
                }
            }
        }
    }

    checkValid = () => {
        const forms = {...this.state.forms}

        let isFormValid = true
        Object.keys(forms).forEach(formName => {
            const form = forms[formName]

            const isValid = this.isValid(form.value, form.validation)
            form.valid = isValid

            form.isMessage = !isValid && form.value.length >= 1

            isFormValid = isFormValid && form.valid
        })

        this.setState({
            forms: forms,
            isFormValid
        })
        return isFormValid
    }

    regHandler = (e) => {
        e.preventDefault()
        const forms = this.state.forms

        const isFormValid = this.checkValid()

        if (isFormValid) {
            this.props.fetchAuth({
                email: forms.email.value,
                password: forms.password.value,
                returnSecureToken: true
            }, false)
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        const forms = this.state.forms

        const isFormValid = this.checkValid()

        if (isFormValid) {
            this.props.fetchAuth({
                email: forms.email.value,
                password: forms.password.value,
                returnSecureToken: true
            }, true)
        }
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

        const disabled = false

        if (form.value.trim() === ''){
            form.isMessage = false
        }

        forms[curForm] = form
        this.setState({
            forms, disabled
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
                       isMessage={form.isMessage}
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

                {this.props.error && <Error error={this.props.error}/>}
                {/*<Error error={this.props.error}/>*/}

                <h1>Authentication</h1>

                <form onSubmit={this.submitHandler}>

                    {this.renderInputs()}

                    <Button
                        type={'success'}
                        isSubmit={true}
                        onClick={this.submitHandler}
                        disabled={this.state.disabled}
                    >
                        Sign In
                    </Button>

                    <Button
                        type={'main'}
                        onClick={this.regHandler}
                        disabled={this.state.disabled}
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

function mapStateToProps(state) {
    return {
        error: state.app.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)