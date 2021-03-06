import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions/authActions'

const Navbar = ({logOut, isAuthenticated, user}) => {

    const isAuthorized = (
        <ul>
            <li><Link to='/profiles'>Developers</Link></li>
            <li><Link to='/posts'>Posts</Link></li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user'></i>
                    {' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to='/' onClick={logOut}>
                    <i className='fas fa-sign-out-alt'></i>
                    {' '}
                    <span className='hide-sm'>{user && user.name}</span>
                </Link>
            </li>
        </ul>
    )

    const isNotAuthorized = (
        <ul>
            <li><Link to='/profiles'>Developers</Link></li>
            <li><Link to='/registration'>Registration</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'><i className='fas fa-code'></i> DevConnector</Link>
            </h1>
            {(isAuthenticated && isAuthorized) || isNotAuthorized}
        </nav>
    )
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    user: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {logOut})(Navbar)