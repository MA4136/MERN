import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logIn } from '../../actions/auth'
import { Link, Redirect } from 'react-router-dom'

const Login = (props) => {
    const {logIn, isAuthenticated} = props

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const onFormChange = (e) => {
        return setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        logIn(email, password)
    }

    // if user already logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'><i className='fas fa-user'></i> Sign into your account</p>
            <form className='form' onSubmit={onFormSubmit}>

                <div className='form-group'>
                    <input type='email'
                           placeholder='Email Address'
                           name='email'
                           value={email}
                           onChange={onFormChange}
                        // required
                    />
                </div>

                <div className='form-group'>
                    <input type='password'
                           placeholder='Password'
                           name='password'
                           value={password}
                           onChange={onFormChange}
                        // minLength='6'
                        // required
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Logln'/>
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/registration'>Sign Up</Link>
            </p>
        </>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {logIn})(Login)