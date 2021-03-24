import React, { useEffect } from 'react'
import { getProfileById } from '../../actions/profileActions'
import ProfileExperience from '../profile/ProfileExperience'
import ProfileEducation from '../profile/ProfileEducation'
import ProfileGithub from '../profile/ProfileGithub'
import ProfileAbout from '../profile/ProfileAbout'
import ProfileInfo from '../profile/ProfileInfo'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProfilePage = ({getProfileById, auth, profileInfo, match}) => {
    const {profile, isLoading, repos} = profileInfo

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <>
            {isLoading && <Spinner/>}
            <Link to='/profiles' className='btn btn-light'>Back</Link>

            {!auth.isLoading && auth.isAuthenticated && profile && auth.user._id === profile.user._id &&
            <Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>
            }

            {profile &&
            <div className='profile-grid my-1'>
                <ProfileInfo profile={profile}/>
                <ProfileAbout profile={profile}/>
            </div>}

            {profile && profile.experience.length > 0 &&
            <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {profile.experience.map(exp => {
                    return <ProfileExperience key={exp._id} experience={exp}/>
                })}
            </div>}

            {profile && profile.education.length > 0 &&
            <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                {profile.education.map(el => {
                    return <ProfileEducation key={el._id} education={el}/>
                })}
            </div>}

            {profile && profile.github &&
            <div className="profile-github">
                <ProfileGithub userName={profile.github} repos={repos}/>
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