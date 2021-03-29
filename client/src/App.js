import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import setAuthToken from './utils/setAuthToken'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Routes from './routing/Routes'
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
                    <Switch>
                        <Route exact path={'/'} component={Landing}/>
                        <Route component={Routes}/>
                    </Switch>
                </Fragment>
            </BrowserRouter></Provider>
    )
}

export default App