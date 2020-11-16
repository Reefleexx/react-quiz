import {combineReducers} from "redux";
import quizReducer from './quiz'
import authReducer from './auth'
import quizListReducer from "./quizList";
import quizCreateReducer from "./create";

export default combineReducers({
    quiz: quizReducer,
    auth: authReducer,
    quizList: quizListReducer,
    create: quizCreateReducer
})
