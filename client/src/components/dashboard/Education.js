import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profileActions'

const Education = ({education, deleteEducation}) => {

    const training = education.map(el => {
        return (
            <tr key={el._id}>
                <td>{el.school}</td>
                <td className='hide-sm'>{el.degree}</td>
                <td>
                    <Moment format='YYYY/MM'>{el.from}</Moment> - {el.to ?
                    <Moment format='YYYY/MM'>{el.to}</Moment> : 'Now'}
                </td>
                <td className='hide-sm'>{el.description}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteEducation(el._id)}>Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <h2 className='my-2'>Education:</h2>
            <table className='table'>
                <thead>
                <tr>
                    <th>Schools</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'>Description</th>
                    <th/>
                </tr>
                </thead>
                <tbody>{training}</tbody>
            </table>
        </>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)