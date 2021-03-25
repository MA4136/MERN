import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/postActions'
import { connect } from 'react-redux'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts, post}) => {
    const {posts, isLoading} = post

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return (
        <>
            {isLoading && <Spinner/>}
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"> Welcome</i>
            </p>

            <PostForm/>

            <div className="posts">
                {!isLoading && posts.map((el) => {
                    return <PostItem key={el._id} post={el}/>
                })}
            </div>
        </>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, {getPosts})(Posts)