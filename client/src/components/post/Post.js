import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'

const Post = ({getPost, postInfo, match}) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])

    return (
        <div>
            Post
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        postInfo: state.post
    }
}

export default connect(mapStateToProps, {getPost})(Post)