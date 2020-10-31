import React from 'react'
import classes from './Select.module.scss'

const Select = (props) => {
    const htmlFor = `${props.label}-${Math.random()}`
    return(
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                onChange={props.onChange}
                value={props.value}
            >
                {props.options.map((option, index) => {
                    return(
                        <option
                            value={option.value}
                            key={index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select