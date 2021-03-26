import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from '../../actions/postActions'

const PostItem = (props) => {
    const {post, auth, addLike, removeLike, deletePost, showActions} = props
    const {_id, date, user, text, name, avatar, likes, comments} = post

    return (
        <>
            <div className='post bg-white p-1 my-1'>
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className='round-img'
                            src={avatar}
                            alt='avatar'
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className='my-1'>
                        {text}
                    </p>
                    <p className='post-date'>posted <Moment format='DD/MM/YYYY'>{date}</Moment></p>

                    {showActions && <>
                        <button type='button' className='btn btn-light' onClick={() => addLike(_id)}>
                            <i className='fas fa-thumbs-up'></i>
                            {likes.length > 0 && <span> {likes.length}</span>}
                        </button>
                        <button type='button' className='btn btn-light' onClick={() => removeLike(_id)}>
                            <i className='fas fa-thumbs-down'></i>
                        </button>

                        <Link to={`/posts/${_id}`} className='btn btn-primary'>Discussion{' '}
                            {comments.length > 0 && <span className='comment-count'> {comments.length}</span>}
                        </Link>

                        {!auth.isLoading && user === auth.user._id &&
                        <button type='button' className='btn btn-danger' onClick={() => deletePost(_id)}>
                            <i className='fas fa-times'></i> delete
                        </button>}
                    </>}
                </div>
            </div>
        </>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)