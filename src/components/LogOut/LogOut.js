import React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {logOut} from '../../redux/actions/auth'

class LogOut extends React.Component{

    componentWillMount() {
        this.props.logOut()
    }

    render () {
        return (
            <Redirect to="/" />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(LogOut))
