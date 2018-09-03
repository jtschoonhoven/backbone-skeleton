import { Record } from 'immutable';


const ACTION_TYPES = {
    SIGNUP: 'SIGNUP',
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
};

const USER_SCHEMA = new Record({
    username: 'guest',
    isLoggedIn: false,
});


function userReducer(state, action) {
    if (typeof state === 'undefined') {
        return new USER_SCHEMA();
    }
    switch (action.type) {
        case ACTION_TYPES.LOGOUT:
            return state.clear();
        case ACTION_TYPES.LOGIN:
            return state.merge({ username: action.username, isLoggedIn: true });
        case ACTION_TYPES.SIGNUP:
            return state.merge({ username: action.username, isLoggedIn: true });
    }
    return state;
}


export default userReducer;
export { ACTION_TYPES };
