import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profileActions'

const AddExperience = ({addExperience, history}) => {

    const [toDateDIsabled, toggleToDateDisabled] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const {title, company, location, from, to, current, description} = formData

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
        addExperience(formData, history)
    }

    return (
        <>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* required field</small>
            <form className="form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <input type="text"
                           placeholder="* Job Title"
                           name="title"
                           value={title}
                           onChange={onFormChange}
                           required/>
                </div>
                <div className="form-group">
                    <input type="text"
                           placeholder="* Company"
                           name="company"
                           value={company}
                           onChange={onFormChange}
                           required/>
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
                    /> Current Job</p>
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
                    rows="5"
                    cols="30"
                    placeholder="* Job Description"
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience))