import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profileActions'

const AddEducation = ({addEducation, history}) => {

    const [toDateDIsabled, toggleToDateDisabled] = useState(false)

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const {school, degree, location, from, to, current, description} = formData

    const onFormChange = (e) => {
        return setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormToggle = () => {
        return setFormData({
            ...formData,
            current: !current
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        addEducation(formData, history)
    }

    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended
            </p>
            <small>* required field</small>
            <form className="form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <input type="text"
                           placeholder="* School or Bootcamp"
                           name="school"
                           value={school} onChange={onFormChange}
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           placeholder="* Degree or Certificate"
                           name="degree"
                           value={degree} onChange={onFormChange}
                           required
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           placeholder="Location"
                           name="location"
                           value={location}
                           onChange={onFormChange}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date"
                           name="from"
                           value={from}
                           onChange={onFormChange}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox"
                              name="current"
                              value={current}
                              checked={current}
                              onChange={() => {
                                  toggleToDateDisabled(!toDateDIsabled)
                                  onFormToggle()
                              }}
                    /> Current School or Bootcamp</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date"
                           name="to"
                           value={to}
                           onChange={onFormChange}
                           disabled={toDateDIsabled}/>
                </div>
                <div className="form-group">
          <textarea name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description}
                    onChange={onFormChange}>
          </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))