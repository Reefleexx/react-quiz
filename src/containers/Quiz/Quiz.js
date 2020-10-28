import React from "react";
import classes from "./Quiz.module.scss"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finish from "../../components/Finish/Finish";

class Quiz extends React.Component {

    state = {
        ActiveQuiz: 0,
        AnswerState: null, // {[id]: "success" or "error]}
        isFinished: false,
        results: {},
        quiz: [
            {
                question: 'What color is sky?',
                rightAnswer: 1,
                id: 1,
                answers: [
                    {text: "Blue", id: 1},
                    {text: "Yellow", id: 2},
                    {text: "Pink", id: 3},
                    {text: "Purple", id: 4}
                ]

            },
            {
                question: 'When was founded Saint Petersburg?',
                rightAnswer: 3,
                id: 2,
                answers: [
                    {text: 1700, id: 1},
                    {text: 1702, id: 2},
                    {text: 1703, id: 3},
                    {text: 1803, id: 4}
                ]

            }
        ]
    }

    retryButton = () => {
        this.setState({
            isFinished: false,
            results: {},
            AnswerState: null,
            ActiveQuiz: 0
        })
    }

    onAnswerClick = (id) => {
        let results = this.state.results
        if(this.state.quiz[this.state.ActiveQuiz].rightAnswer === id){

            if (!this.state.results[this.state.ActiveQuiz]){
                results[this.state.ActiveQuiz] = 'success'
            }
            this.setState({
                AnswerState: {[id]: 'success'},
                results
            })

            if(this.state.quiz.length >= this.state.ActiveQuiz + 2) {

                this.setState({
                    ActiveQuiz: this.state.ActiveQuiz + 1
                })
                this.setState({
                    AnswerState: null
                })

            } else {
                this.setState({
                    isFinished: true
                })
            }
        } else {
            results[this.state.ActiveQuiz] = 'error'
            this.setState({
                AnswerState: {[id]: 'error'},
                results
            })
        }
    }

    render() {
        return (
            <div className={classes.quiz}>
                {
                    this.state.isFinished
                        ?
                        <>
                            <h1>Your Answers</h1>
                            <Finish
                                results={this.state.results}
                                quiz={this.state.quiz}
                                retryHandler={this.retryButton}
                            />
                        </>
                        :
                        <>
                            <h1>Answer the questions</h1>
                            <ActiveQuiz
                                question={this.state.quiz[this.state.ActiveQuiz]}
                                onAnswerClick={this.onAnswerClick}
                                answerState={this.state.AnswerState}
                                numPage={this.state.ActiveQuiz + 1}
                                pageCount={this.state.quiz.length}
                            />
                        </>

                }
            </div>
        )
    }
}

export default Quiz