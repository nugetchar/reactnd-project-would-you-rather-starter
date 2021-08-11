import { ADD_QUESTION_USER, GET_USERS } from '../actions/users';

export function users(users = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...action.users
            }
        case ADD_QUESTION_USER:
            return {
                ...users,
                [action.userId]: {
                    ...users[action.userId],
                    questions: users[action.userId].questions.concat([action.questionId])
                }
            }
        default:
            return users;
    }
}