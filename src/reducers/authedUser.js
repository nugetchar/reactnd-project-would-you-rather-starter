import { LOG_IN, LOG_OUT } from "../actions/authedUser";

export function authedUser(authedUser = null, action) {
  switch (action.type) {
    case LOG_IN:
      return action.id;
    case LOG_OUT:
      return null;
    default:
      return authedUser;
  }
}
