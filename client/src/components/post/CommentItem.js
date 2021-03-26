import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment } from '../../actions/postActions'

const CommentItem = ({comment, postId, deleteComment, auth}) => {
    const {_id, user, text, name, avatar, date} = comment
    console.log(typeof postId)

    return (
        <div className='post bg-white p-1 my-1'>
            <div>
                <Link to={`/profile/${user}`}>
                    <img className='round-img'
                         src={avatar}
                         alt='avatar'
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    posted <Moment format='DD/MM/YYY'>{date}</Moment>
                </p>
                {
                    !auth.isLoading && auth.user._id === user &&
                    <button type='button'
                            className='btn btn-danger'
                            onClick={() => deleteComment(postId, _id)}>
                        <i className='fas fa-times'></i> delete
                    </button>
                }
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {deleteComment})(CommentItem)