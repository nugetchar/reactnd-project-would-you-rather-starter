import { showLoading } from "react-redux-loading-bar";
import { _saveQuestion, _saveQuestionAnswer} from '../api/_DATA';
import { nextUrl } from "./routing";
import { addQuestionUser, toggleAnswered } from "./users";

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const TOGGLE_VOTE_QUESTION = 'VOTE_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function toggleVote(authedUser, qid, answer) {
    return {
        type: TOGGLE_VOTE_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function createQuestion(question) {
    return {
        type: CREATE_QUESTION,
        question
    }
}

export function handleVote(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(toggleVote(authedUser, qid, answer));
        dispatch(toggleAnswered(authedUser, qid, answer));
        _saveQuestionAnswer({authedUser, qid, answer})
        .catch(() => {
            dispatch(toggleVote(authedUser, qid, answer));
            dispatch(toggleAnswered(authedUser, qid, answer));
        });
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestion({optionOneText, optionTwoText, author})
        .then((question) => {
            dispatch(createQuestion(question));
            dispatch(addQuestionUser(author, question.id));
            dispatch(nextUrl(`/`));
        })
        .catch(() => alert(`Error trying to save the question. Please try again.`))
    }
}