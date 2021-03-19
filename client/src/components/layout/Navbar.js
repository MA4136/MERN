import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions/auth'

const Navbar = ({logOut, isAuthenticated}) => {

    const isAuthorized = (
        <ul>
            <li>
                <Link to='/' onClick={logOut}>
                    <i className='fas fa-sign-out-alt'></i>
                    {' '}
                    <span className='hide-sm'>LogOut</span>
                </Link>
            </li>
        </ul>
    )

    const isNotAuthorized = (
        <ul>
            <li><Link to='profiles'>Developers</Link></li>
            <li><Link to='/registration'>Registration</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'><i className='fas fa-code'></i> DevConnector</Link>
            </h1>
            {isAuthenticated && isAuthorized || isNotAuthorized}
        </nav>
    )
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {logOut})(Navbar)