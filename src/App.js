import Quiz from "./containers/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";
import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom'
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import LogOut from './components/LogOut/LogOut'
import {connect} from "react-redux";
import {checkStorage} from "./redux/actions/auth";

class App extends React.Component{

    componentWillMount() {
        this.props.checkStorage()
    }

    render() {
        let routs
        if (this.props.isAuth) {
            routs = <Switch>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/logOut' component={LogOut}/>
                <Route path='/' component={QuizList}/>
            </Switch>

        } else {
            routs = (
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/' component={QuizList}/>
                </Switch>
            )
        }

    return(
        <Layout>
            {routs}
        </Layout>
    )
  }
}

function mapStateToProps (state) {
    return {
        isAuth: !!state.auth.token
    }
}

function mapDispatchToProps (dispatch) {
    return {
        checkStorage: () => dispatch(checkStorage())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))