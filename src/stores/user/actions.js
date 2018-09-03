import dispatcher from '../../dispatcher';


const ACTION_TYPES = {
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
};

const ACTIONS = {
    LOGIN: (username, password, callback) => {
        const data = { username, password };
        dispatcher.dispatch(ACTION_TYPES.LOGIN, data, callback);
    },
    LOGOUT: (callback) => {
        dispatcher.dispatch(ACTION_TYPES.LOGOUT, null, callback);
    },
    SIGNUP: (username, password, callback) => {
        const data = { username, password };
        dispatcher.dispatch(ACTION_TYPES.SIGNUP, data, callback);
    },
};


export default ACTIONS;
export { ACTION_TYPES };
