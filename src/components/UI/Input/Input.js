import React, {useState} from 'react'
import classes from './Input.module.scss'

const Input = (props) => {
    const htmlFor = `${props.type}-${Math.random()}`
    const cls = [classes.input]
    const [isPasswordVisible, changeVisibility] = useState(false)

    const isInvalid = ({isTouched, valid}) => {
        if(isTouched && !valid) {
            return true;
        }
    }

    const changePasswordVisibility = (event) => {
        event.preventDefault()
        changeVisibility(!isPasswordVisible)
    }

    if (isInvalid(props) && props.isMessage){
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <div className={classes.inputForm}>
                <input
                    id={htmlFor}
                    type={isPasswordVisible ? 'text' : props.type}
                    onChange={props.onChange}
                    value={props.value}
                />
                {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    props.type === 'password' && <a href="" onClick={(event) => changePasswordVisibility(event)}>
                        <i className={`fa fa-eye${isPasswordVisible ? '' : '-slash'}`} aria-hidden="true"/>
                    </a>
                }
            </div>
            {
                isInvalid(props) && props.isMessage ?
                    <span>{props.errorMessage || 'Enter the right value'}</span> :
                    null
            }
        </div>
    )
}

export default Input