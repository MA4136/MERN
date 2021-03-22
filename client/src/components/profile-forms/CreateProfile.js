import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile } from '../../actions/profileActions'

const CreateProfile = ({createProfile, history}) => {

    const [displayFields, toggleDisplayFields] = useState(false)

    const [formData, setFormData] = useState({
        bio: '',
        github: '',
        status: '',
        skills: '',
        twitter: '',
        youtube: '',
        company: '',
        website: '',
        location: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    })

    const {
        bio, company, website, location, github, status, skills, vk, youtube, facebook, twitter, linkedin, instagram
    } = formData

    const onFormChange = (e) => {
        return setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        createProfile(formData, history)
    }

    return (
        <>
            <h1 className='large text-primary'> Create Your Profile </h1>
            <p className='lead'>
                <i className='fas fa-user'></i>
                Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={onFormSubmit}>
                <div className='form-group'>
                    <select name='status' value={status} onChange={onFormChange}>
                        <option value='0'>* Select Professional Status</option>
                        <option value='Developer'>Developer</option>
                        <option value='Junior Developer'>Junior Developer</option>
                        <option value='Senior Developer'>Senior Developer</option>
                        <option value='Manager'>Manager</option>
                        <option value='Student or Learning'>Student or Learning</option>
                        <option value='Instructor'>Instructor or Teacher</option>
                        <option value='Intern'>Intern</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        Give us an idea of where you are at in your career
                    </small>
                </div>

                <div className='form-group'>
                    <input type='text' placeholder='Company' name='company'
                           value={company} onChange={onFormChange}/>
                    <small className='form-text'>Could be your own company or one you work for</small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Website' name='website'
                           value={website} onChange={onFormChange}/>
                    <small className='form-text'>Could be your own or a company website</small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Location' name='location'
                           value={location} onChange={onFormChange}/>
                    <small className='form-text'>City & state suggested (eg. Barad-Dur, Gorgoroth)</small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='* Skills' name='skills'
                           value={skills} onChange={onFormChange}/>
                    <small className='form-text'>Please use comma separated values
                        (eg. HTML, CSS, JavaScript, PHP)</small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Github Username' name='github'
                           value={github} onChange={onFormChange}/>
                    <small className='form-text'> If you want your latest repos and a Github link, include your
                        username </small>
                </div>
                <div className='form-group'>
                    <textarea placeholder='A short bio of yourself' name='bio'
                              value={bio} onChange={onFormChange}>
                    </textarea>
                    <small className='form-text'>Tell us a little about yourself</small>
                </div>

                <div className='my-2'>
                    <button type='button' className='btn btn-light' onClick={() => toggleDisplayFields(!displayFields)}>
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displayFields &&
                <>
                    <div className='form-group social-input'>
                        <i className='fab fa-twitter fa-2x'></i>
                        <input type='text' placeholder='Twitter URL' name='twitter' value={twitter}
                               onChange={onFormChange}/>
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-vk fa-2x'></i>
                        <input type='text' placeholder='VK URL' name='vk' value={vk}
                               onChange={onFormChange}/>
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-facebook fa-2x'></i>
                        <input type='text' placeholder='Facebook URL' name='facebook' value={facebook}
                               onChange={onFormChange}/>
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-youtube fa-2x'></i>
                        <input type='text' placeholder='YouTube URL' name='youtube' value={youtube}
                               onChange={onFormChange}/>
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-linkedin fa-2x'></i>
                        <input type='text' placeholder='Linkedin URL' name='linkedin' value={linkedin}
                               onChange={onFormChange}/>
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-instagram fa-2x'></i>
                        <input type='text' placeholder='Instagram URL' name='instagram' value={instagram}
                               onChange={onFormChange}/>
                    </div>
                </>}

                <input type='submit' className='btn btn-primary my-1'/>
                <Link className='btn btn-light my-1' to='/dashboard'>Go Back</Link>
            </form>
        </>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, {createProfile})(withRouter(CreateProfile))