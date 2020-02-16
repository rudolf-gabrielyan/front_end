const initialState = {
    isLoggedIn: false,
    data: {},
    loginErrors: ""
};

function user(state = initialState , action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS' :
            return {
                ...initialState,
                isLoggedIn: true,
                data: action.payload,
            };
        case 'LOGIN_ERROR' :
            return {
                ...initialState,
                loginErrors: action.payload,
            };
        case 'NO_LOGGED_USER' :
            return initialState;
        case 'LOGOUT' :
            return initialState;
        default :
            return state
    }
}

export default user
