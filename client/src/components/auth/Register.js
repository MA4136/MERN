import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'

const Register = ({setAlert}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',  // confirm password
    })

    const {name, email, password, password2,} = formData

    const onFormChange = (e) => {
        return setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (!password.length || password !== password2) {
            setAlert('Password do not match!', 'danger')
            console.log('%cWrong!', 'color : red; background : #333333; font-weight: bold; font-size: large;')
        } else {
            const newUser = {name, email, password}
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser)

                const res = await axios.post('/api/users', body, config)
                console.log(res.data)

                console.log('%cSuccess!', 'color: deepskyblue; background : black; font-size: large;')

            } catch (e) {
                console.error(e.response.data)
            }
        }
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
                           minLength='6'
                           onChange={onFormChange}
                        // required
                    />
                </div>

                <div className='form-group'>
                    <input type='password'
                           placeholder='Confirm Password'
                           name='password2'
                           value={password2}
                           minLength='6'
                           onChange={onFormChange}
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
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {setAlert})(Register)