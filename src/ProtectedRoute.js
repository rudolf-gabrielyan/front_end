import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ userIsLoggedIn, component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if(userIsLoggedIn) {
            if(rest.path !== '/login' && rest.path !== '/signup') {
                return <Component {...props} />
            }else {
                return <Redirect to='/profile' />
            }
        }else {
            if(rest.path !== '/login' && rest.path !== '/signup') {
                return <Redirect to='/login' />
            } else {
                return <Component {...props} />
            }
        }
    }} />
)

const mapStateToProps = state => {
    return {
        userIsLoggedIn: state.user.isLoggedIn,
    }
};

export default connect(mapStateToProps)(ProtectedRoute)
