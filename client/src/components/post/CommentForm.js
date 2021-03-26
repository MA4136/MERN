import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/postActions'

const CommentForm = ({addComment, postId}) => {

    const [text, setText] = useState('')

    const onFormChange = (e) => {
        setText(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        addComment(postId, {text})
        setText('')
    }

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Fend it off!</h3>
            </div>
            <form className='form my-1'
                  onSubmit={onFormSubmit}>
          <textarea placeholder='your comment'
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)