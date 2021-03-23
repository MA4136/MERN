import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profileActions'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const ProfileList = ({getProfiles, profileInfo}) => {
    const {profiles, isLoading} = profileInfo

    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <>
            {isLoading && <Spinner/>}
            {
                !isLoading &&
                <>
                    <h2 className="large text-primary">Developers:</h2>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse & connect with developers
                    </p>
                    <div className="profiles">
                        {!profiles.length && 'No profiles found'}
                        {
                            profiles.length && profiles.map((el) => {
                                return <ProfileItem key={el._id} profile={el}/>
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

ProfileList.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profileInfo: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => {
    return {
        profileInfo: state.profile
    }
}

export default connect(mapStateToProps, {getProfiles})(ProfileList)