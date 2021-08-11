import { CREATE_QUESTION, GET_QUESTIONS, TOGGLE_VOTE_QUESTION } from '../actions/questions';

export function questions(questions = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...action.questions
            }
        case TOGGLE_VOTE_QUESTION:
            return {
                ...questions,
                [action.qid]: {
                    ...questions[action.qid],
                    [action.answer]: {
                        ...questions[action.qid][action.answer],
                        votes: questions[action.qid][action.answer].votes.includes(action.authedUser) 
                            ? questions[action.qid][action.answer].votes.filter(id => id !== action.authedUser)
                            : questions[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case CREATE_QUESTION: 
            return {
                ...questions,
                [action.question.id]: {
                    ...action.question
                }
            }
        default:
            return questions;
    }
}