import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Navbar/>
                <Route exact={true} path={'/'} component={Landing}/>
                <section className='container'>
                    <Switch>
                        <Route exact={true} path={'/registration'} component={Register}/>
                        <Route exact={true} path={'/login'} component={Login}/>
                    </Switch>
                </section>
            </Fragment>
        </BrowserRouter>
    )
}

export default App
