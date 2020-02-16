import React, { useEffect,useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from './components/redux/actions/userActions';
import ProtectedRoute from './ProtectedRoute';

import Login from './components/AuthComponents/LoginComponent/Login';
import Signup from './components/AuthComponents/SignupComponent/Signup';
import Profile from './components/User/Profile';
import UserHeader from './components/User/UserHeader/UserHeader';
import MyResumes from './components/Resume/myResume';
import './app.scss'


function App({ checkAuth }) {

    const [render, setRender] = useState(false);

    useEffect(() => {
        checkAuth().then(()=>setRender(true));
    }, []);

    if(render){
        return (
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path='/login' component={Login} />
                    <ProtectedRoute exact path='/signup' component={Signup} />

                    <Route to="/">
                        <UserHeader/>
                        <Switch>
                            <ProtectedRoute exact path='/profile' component={Profile} />
                            <ProtectedRoute exact path='/resumes' component={MyResumes} />
                        </Switch>
                    </Route>

                </Switch>
            </BrowserRouter>
        )
    }
    else {
        return (
            <div className="loading" style={{fontSize:"84px"}}>Loading...</div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch(checkAuth())
    }
};

export default connect(null, mapDispatchToProps)(App);

