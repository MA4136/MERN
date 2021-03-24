import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education}) => {
    const {school, degree, location, from, to, description} = education

    return (
        <div>
            <h3>{school}</h3>
            <p><Moment format='YYYY/MM/DD'>{from}</Moment> - {(to && <Moment format='YYYY/MM/DD'>{to}</Moment>) ||
            <span>Now</span>}</p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Location: </strong>{location}</p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation