import React from "react";
import classes from "./Quiz.module.scss"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finish from "../../components/Finish/Finish";
import {connect} from "react-redux";
import {fetchQuiz, onAnswerClick, retryButton, unMount} from "../../redux/actions/quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {

    componentWillUnmount() {
        this.props.unMount()
    }

    componentDidMount () {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    onAnswerClick = (id) => {
        this.props.onAnswerClick(id)
    }

    render() {
        return (
            <div className={classes.quiz}>
                {
                    this.props.isFinished
                        ?
                        <>
                            <h1>Your Answers</h1>
                            <Finish
                                results={this.props.results}
                                quiz={this.props.quiz}
                                retryHandler={this.props.retryButton}
                            />
                        </>
                        : this.props.loading
                        ?
                        <Loader />
                        :
                        <>
                            <h1>Answer the questions</h1>
                            <ActiveQuiz
                                question={this.props.quiz[this.props.ActiveQuiz]}
                                onAnswerClick={this.onAnswerClick}
                                answerState={this.props.AnswerState}
                                numPage={this.props.ActiveQuiz + 1}
                                pageCount={this.props.quiz.length}
                            />
                        </>


                }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ActiveQuiz: state.quiz.ActiveQuiz,
        AnswerState: state.quiz.AnswerState,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        retryButton: () => dispatch(retryButton()),
        onAnswerClick: (id, type) => dispatch(onAnswerClick(id, type)),
        fetchQuiz: (id) => dispatch(fetchQuiz(id)),
        unMount: () => dispatch(unMount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)