import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profileActions'

const Experience = ({experience, deleteExperience}) => {

    const experiences = experience.map(el => {
        return <>
            <tr key={el._id}>
                <td>{el.company}Comp</td>
                <td className="hide-sm">{el.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{el.from}</Moment> - {el.to ?
                    <Moment format='YYYY/MM/DD'>{el.to}</Moment> : 'Now'}
                </td>
                <td className="hide-sm">{el.description}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteExperience(el._id)}>Delete</button>
                </td>
            </tr>
        </>
    })

    return (
        <>
            <h2 className="my-2">Experiance:</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th className="hide-sm">Description</th>
                    <th/>
                </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience)