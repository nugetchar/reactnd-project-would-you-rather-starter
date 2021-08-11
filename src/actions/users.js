export const GET_USERS = 'GET_USERS';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';
export const TOGGLE_ANSWERED = 'TOGGLE_ANSWERED';

export function receiveUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function addQuestionUser(userId, questionId) {
    return {
        type: ADD_QUESTION_USER,
        userId,
        questionId
    }
}

export function toggleAnswered(userId, questionId, answer) {
    return {
        type: TOGGLE_ANSWERED,
        userId,
        questionId,
        answer
    }
}