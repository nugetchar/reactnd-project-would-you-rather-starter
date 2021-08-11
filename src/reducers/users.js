import {
  ADD_QUESTION_USER,
  GET_USERS,
  TOGGLE_ANSWERED,
} from "../actions/users";

export function users(users = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...action.users,
      };
    case ADD_QUESTION_USER:
      return {
        ...users,
        [action.userId]: {
          ...users[action.userId],
          questions: users[action.userId].questions.concat([action.questionId]),
        },
      };
    case TOGGLE_ANSWERED:
      const answers = { ...users[action.userId].answers };

      !!answers[action.questionId]
        ? delete answers[action.questionId]
        : (answers[action.questionId] = action.answer);

      return {
        ...users,
        [action.userId]: {
          ...users[action.userId],
          answers,
        },
      };
    default:
      return users;
  }
}
