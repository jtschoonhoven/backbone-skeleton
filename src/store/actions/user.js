import store from '../store';
import { ACTION_TYPES } from '../reducers/user';


const ACTIONS = {
    LOGIN: (username, password) => {
        store.dispatch({
            type: ACTION_TYPES.LOGIN,
            username,
            password,
        });
    },
    LOGOUT: () => {
        store.dispatch({ type: ACTION_TYPES.LOGOUT });
    },
    SIGNUP: (username, password) => {
        store.dispatch({
            type: ACTION_TYPES.SIGNUP,
            username,
            password,
        });
    },
};


export default ACTIONS;
