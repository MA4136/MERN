import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'

const Dashboard = ({getCurrentProfile, profileInfo, user}) => {
    const {isLoading, profile} = profileInfo
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return (
        <>
            {(isLoading && <Spinner/>) ||
            <div>
                <h1 className="large">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user">{' '} Welcome {user.name}</i>
                </p>
            </div>}

            {!isLoading && !profile &&
            <p> There is no profile for this user, but you can
                <span> </span>
                <Link to='/create-profile'> create profile</Link>
            </p>
            }

            {!isLoading && profile &&
            <div>some info fom profile</div>
            }
        </>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profileInfo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profileInfo: state.profile,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)