import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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

    const onFormSubmit = async (e) => {
        e.preventDefault()
        // console.log('%cWrong!', 'color : red; background : #333333; font-weight: bold; font-size: large;')
        // console.log('%cSuccess!', 'color: deepskyblue; background : black; font-size: large;')
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
                           minLength='6'
                           onChange={onFormChange}
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


export default Login