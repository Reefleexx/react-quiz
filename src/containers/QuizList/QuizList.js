import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchQuiz, fetchDeleteQuiz} from "../../redux/actions/quizList";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

    componentDidMount() {
        this.props.fetchQuiz()
    }

    deleteQuiz = (id) => {
        this.props.deleteQuiz(id)
    }

    QuizRender = () => {
        if (this.props.quizList.length > 0) {
            return (
                this.props.quizList.map((quiz, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={'/quiz/' + quiz.id}>{quiz.title}</NavLink>
                            {
                                this.props.isAuth && <i
                                    className={'fa fa-times'}
                                    onClick={() => this.props.fetchDeleteQuiz(quiz.id)}
                                />
                            }
                        </li>
                    )
                })
            )
        } else {
            return (<span>No quizes yet</span>)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.props.loading ?
                            <Loader />
                            :
                            <ul>
                                {this.QuizRender()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
        quizList: state.quizList.quizes,
        loading: state.quizList.loading,
        isAuth: state.auth.token
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuiz: () => dispatch(fetchQuiz()),
        fetchDeleteQuiz: (id) => dispatch(fetchDeleteQuiz(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)