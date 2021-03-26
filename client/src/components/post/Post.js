import React, { useEffect } from 'react'
import { getPost } from '../../actions/postActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostItem from '../posts/PostItem'
import Spinner from '../layout/Spinner'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost, postInfo, match}) => {
    const {post, isLoading} = postInfo

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    return isLoading || !post ? <Spinner/> :
        <>
            <Link to='/posts' className='btn btn-light'>Back</Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id}/>

            <div className='comments'>
                {post.comments.length > 0 ?
                    post.comments.map(el => <CommentItem key={el._id} comment={el} postId={post._id}/>)
                    :
                    <div>There is no comments yet</div>
                }
            </div>
        </>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    postInfo: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        postInfo: state.post
    }
}

export default connect(mapStateToProps, {getPost})(Post)