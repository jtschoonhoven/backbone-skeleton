import dispatcher from '../../dispatcher';


const ACTION_TYPES = {
    SIGNUP: 'SIGNUP',
};

const ACTIONS = {
    SIGNUP: (username, password, callback) => {
        const data = { username, password };
        dispatcher.dispatch(ACTION_TYPES.SIGNUP, data, callback);
    },
};


export default ACTIONS;
export { ACTION_TYPES };
