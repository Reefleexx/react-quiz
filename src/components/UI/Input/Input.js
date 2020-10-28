import React from 'react'
import classes from './Input.module.scss'

const Input = (props) => {
    const htmlFor = `${props.type}-${Math.random()}`
    const cls = [classes.input]

    const isInvalid = ({isTouched, valid}) => {
        if(isTouched && !valid) {
            return true;
        }
    }

    if (isInvalid(props)){
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={props.type}
                onChange={props.onChange}
                value={props.value}
            />
            {
                isInvalid(props) ?
                    <span>{props.errorMessage || 'Enter the right value'}</span> :
                    null
            }
        </div>
    )
}

export default Input