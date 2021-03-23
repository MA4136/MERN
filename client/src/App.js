import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import setAuthToken from './utils/setAuthToken'
import ProfileCreate from './components/profile-forms/CreateProfile'
import UpdateProfile from './components/profile-forms/UpdateProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import ProfileList from './components/profiles/ProfileList'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profiles/Profile'
import Register from './components/auth/Register'
import PrivateRoute from './routing/PrivateRoute'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Login from './components/auth/Login'
import store from './store'
import './App.css'


if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <Route exact path={'/'} component={Landing}/>
                    <section className='container'>
                        <Alert/>
                        <Switch>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/registration'} component={Register}/>
                            <Route exact path={'/profile/:id'} component={Profile}/>
                            <Route exact path={'/profiles'} component={ProfileList}/>
                            <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
                            <PrivateRoute exact path={'/create-profile'} component={ProfileCreate}/>
                            <PrivateRoute exact path={'/edit-profile'} component={UpdateProfile}/>
                            <PrivateRoute exact path={'/add-education'} component={AddEducation}/>
                            <PrivateRoute exact path={'/add-experience'} component={AddExperience}/>
                        </Switch>
                    </section>
                </Fragment>
            </BrowserRouter></Provider>
    )
}

export default App