import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileInfo from '../profile/ProfileInfo'
import ProfileAbout from '../profile/ProfileAbout'

const ProfilePage = ({getProfileById, auth, profileInfo, match}) => {
    const {profile, isLoading} = profileInfo
    console.log(profile)

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <>
            {isLoading && <Spinner/>}
            <Link to='/profiles' className='btn btn-light'>Back</Link>

            {
                !auth.isLoading && auth.isAuthenticated && profile && auth.user._id === profile.user._id &&
                <>
                    <Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>
                </>
            }

            {profile &&
            <div className="prfile-grid my-1">
                <ProfileInfo profile={profile}/>
                <ProfileAbout profile={profile}/>
            </div>
            }
        </>
    )
}

ProfilePage.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profileInfo: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        profileInfo: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getProfileById})(ProfilePage)