
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { _getQuestions, _getUsers } from '../api/_DATA';    
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export const INIT_DATA = 'INIT_DATA';

export function handleInitData() {
    return (dispatch) => {
        dispatch(showLoading());
        Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => {
            dispatch(hideLoading());
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        })
    }
}