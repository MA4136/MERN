import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../../actions/authActions'
import { setAlert } from '../../actions/alertActions'

const Register = (props) => {
    const {setAlert, register, isAuthenticated} = props

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',  // confirm password
    })

    const {name, email, password, password2} = formData

    const onFormChange = (e) => {
        return setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (!password.length || password !== password2) {
            setAlert('Password do not match!', 'danger', 2000)
            console.log('%cWrong!', 'color : red; background : #333333; font-weight: bold')
        } else {
            register({name, email, password})
            // console.log('%cSuccess!', 'color: deepskyblue; background : black')
        }
    }

    // if user already registered
    if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'><i className='fas fa-user'></i> Create Your Account</p>
            <form className='form' onSubmit={onFormSubmit}>

                <div className='form-group'>
                    <input type='text'
                           placeholder='Name'
                           name='name'
                           value={name}
                           onChange={onFormChange}
                        // required
                    />
                </div>

                <div className='form-group'>
                    <input type='email'
                           placeholder='Email Address'
                           name='email'
                           value={email}
                           onChange={onFormChange}
                        // required
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
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

                <div className='form-group'>
                    <input type='password'
                           placeholder='Confirm Password'
                           name='password2'
                           value={password2}
                           onChange={onFormChange}
                        // minLength='6'
                        // required
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Register'/>
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {setAlert, register})(Register)