import dispatcher from '../../dispatcher';


const ACTION_TYPES = {
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
};

const ACTIONS = {
    LOGIN: (username, password) => {
        dispatcher.dispatch({
            type: ACTION_TYPES.LOGIN,
            username,
            password,
        });
    },
    LOGOUT: () => {
        dispatcher.dispatch({ type: ACTION_TYPES.LOGOUT });
    },
    SIGNUP: (username, password) => {
        dispatcher.dispatch({
            type: ACTION_TYPES.SIGNUP,
            username,
            password,
        });
    },
};


export default ACTIONS;
export { ACTION_TYPES };
