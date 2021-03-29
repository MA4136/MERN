import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProfileCreate from '../components/profile-forms/CreateProfile'
import UpdateProfile from '../components/profile-forms/UpdateProfile'
import AddExperience from '../components/profile-forms/AddExperience'
import AddEducation from '../components/profile-forms/AddEducation'
import ProfileList from '../components/profiles/ProfileList'
import ProfilePage from '../components/profiles/ProfilePage'
import Dashboard from '../components/dashboard/Dashboard'
import NotFound from '../components/layout/NotFound'
import Register from '../components/auth/Register'
import Alert from '../components/layout/Alert'
import Posts from '../components/posts/Posts'
import Login from '../components/auth/Login'
import Post from '../components/post/Post'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
    return (
        <section className='container'>
            <Alert/>
            <Switch>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/profiles'} component={ProfileList}/>
                <Route exact path={'/registration'} component={Register}/>
                <Route exact path={'/profile/:id'} component={ProfilePage}/>
                <PrivateRoute exact path={'/posts'} component={Posts}/>
                <PrivateRoute exact path={'/posts/:id'} component={Post}/>
                <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
                <PrivateRoute exact path={'/create-profile'} component={ProfileCreate}/>
                <PrivateRoute exact path={'/edit-profile'} component={UpdateProfile}/>
                <PrivateRoute exact path={'/add-education'} component={AddEducation}/>
                <PrivateRoute exact path={'/add-experience'} component={AddExperience}/>
                <Route component={NotFound}/>
            </Switch>
        </section>
    )
}

export default Routes