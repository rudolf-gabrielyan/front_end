import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('http://localhost:8000/api/login', data)
        .then(response => {
            localStorage.setItem('userToken', response.data.token);

            const user = {
                id: response.data.user.id,
                fullName: response.data.user.full_name,
                email: response.data.user.email,
                apiAuthToken: undefined,
                authToken: response.data.token,
                createdAt: response.data.user.created_at,
                updatedAt: response.data.user.updated_at,
            };

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user,
            });

            return 'success'

        })
        .catch(error => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data,
            });

            return 'error'
        })
    }
};

export function checkAuth() {
    return dispatch => {
        if(localStorage.userToken) {
            return axios.get('http://localhost:8000/api/checkAuth', {
                headers: { Authorization: `Bearer ${localStorage.userToken}` }
            })
            .then(response => {
                const user = {
                    id: response.data.user.id,
                    fullName: response.data.user.full_name,
                    email: response.data.user.email,
                    apiAuthToken: localStorage.getItem('apiAuthToken'),
                    authToken: localStorage.getItem('userToken'),
                    createdAt: response.data.user.created_at,
                    updatedAt: response.data.user.updated_at,
                };
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user,
                });
                return Promise.resolve()
            })
            .catch(error => {
                localStorage.removeItem('userToken');
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: error.response.data,
                });
                return Promise.resolve()
            })
        }else {
            dispatch({type: 'NO_LOGGED_USER'});
            return Promise.resolve()
        }
    }
};

export function logout() {
    return dispatch => {
        return axios.get('http://localhost:8000/api/logout', {
            headers: { Authorization: `Bearer ${localStorage.userToken}` }
        })
        .then(response => {
            localStorage.removeItem('userToken');
            dispatch({
                type: 'LOGOUT',
            });
            return 'success'
        })
        .catch(error => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: error.response.data,
            });
            return 'error'
        })
    }
};
