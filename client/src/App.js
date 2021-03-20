import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
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
                            <Route exact path={'/registration'} component={Register}/>
                            <Route exact path={'/login'} component={Login}/>
                            <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
                        </Switch>
                    </section>
                </Fragment>
            </BrowserRouter></Provider>
    )
}

export default App