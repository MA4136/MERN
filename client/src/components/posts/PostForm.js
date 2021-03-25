import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'

const PostForm = ({addPost}) => {

    const [text, setText] = useState('')

    const onFormChange = (e) => {
        setText(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        addPost({text})
        setText('')
    }

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Defeat them with your wisdom!</h3>
            </div>
            <form className='form my-1'
                  onSubmit={onFormSubmit}>
          <textarea placeholder='Create a post'
                    onChange={onFormChange}
                    value={text}
                    name='text'
                    cols='30'
                    rows='5'
                    required>
          </textarea>
                <input type='submit' className='btn btn-dark my-1' value='Submit'/>
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)