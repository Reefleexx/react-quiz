import React from 'react'
import classes from './Error.module.scss'
import {useDispatch} from "react-redux";
import {hideAlert} from "../../../redux/actions/app";
// import {CSSTransition} from "react-transition-group";

const Error = (props) => {

    const dispatch = useDispatch()
    // const error = useSelector(state => state.app.error)

    // const Element = ({state}) => (
    //     <div className={classes.error + " " + classes[state]}>
    //         <div className="alert alert-danger alert-dismissible fade show" role="alert">
    //             <span><strong>Error!</strong> {error}</span>
    //             <i id={classes.id} className="fas fa-times" onClick={() => dispatch(hideAlert())}/>
    //         </div>
    //     </div>
    // )

    return(
        // <CSSTransition in={!!error} timeout={100} mountOnEnter unmountOnExit>
        //     {state => <Element state={state}/> }
        // </CSSTransition>
        <div className={classes.error}>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <span><strong>Error!</strong> {props.error}</span>
                <i id={classes.id} className="fas fa-times" onClick={() => dispatch(hideAlert())}/>
            </div>
        </div>
    )
}


export default Error