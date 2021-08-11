export const GET_USERS = 'GET_USERS';
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';

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