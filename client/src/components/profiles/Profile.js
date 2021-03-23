import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Profile = ({getProfileById, auth, profileInfo, match}) => {
    const {profile, isLoading} = profileInfo

    useEffect(() => {
        getProfileById(match.params.id)
    },[getProfileById])

    return (
        <>
            {isLoading && <Spinner/>}
            <Link to='/profiles' className='btn btn-light'>Back</Link>
            {/*
            {
                !auth.isLoading && auth.isAuthenticated && auth.user.id === profile.user.id &&
                <>
                    Edit profile
                </>
            }*/}
        </>
    )
}

Profile.propTypes = {
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
export default connect(mapStateToProps, {getProfileById})(Profile)