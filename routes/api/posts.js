const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const middlewareAuth = require('../../middleware/authentication')

const Post = require('../../models/Post')
const User = require('../../models/User')

// route    GET api/posts
// desc     Get all posts
// access   Private
router.get('/', middlewareAuth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1}) // recent first
        res.json(posts)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    POST api/posts
// desc     Create a post
// access   Private
router.post('/', [middlewareAuth,
        [
            check('text', 'Text is required').not().isEmpty()
        ]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const user = await User.findById(req.user.id).select(['-password', '-email'])
            console.log(user)
            const newPost = new Post({
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            })

            const post = await newPost.save()
            res.json({msg: 'Post created', post})

        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server Error')
        }
    }
)

// route    GET api/posts/:id
// desc     Get post by id
// access   Private
router.get('/:id', middlewareAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.json(post)

    } catch (e) {
        console.error(e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
})

// route    DELETE api/posts/:id
// desc     Delete post by id
// access   Private
router.delete('/:id', middlewareAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({msg: 'Post not found'})
        }

        //  Check post owner
        if (String(post.user) !== req.user.id) { // post.user is ObjectId, req.user.id is String
            return res.status(401).json({msg: 'You can`t remove that'})
        }
        await post.remove()
        res.json({msg: 'Post removed'})

    } catch (e) {
        console.error(e.message)
        if (e.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
})

// route    PUT api/posts/like/:id
// desc     Like a post
// access   Private
router.put('/like/:id', middlewareAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const user = await User.findById(req.user.id)

        //  Check if the post has already been liked by current user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length) {
            return res.status(401).json({msg: 'Post already liked'})
        }

        post.likes.unshift({name: user.name, user: req.user.id})
        await post.save()

        res.json(post.likes)

    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    PUT api/posts/unlike/:id
// desc     Unlike a post
// access   Private
router.put('/unlike/:id', middlewareAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //  Check if the post has already been liked by current user
        if (!post.likes.filter(like => like.user.toString() === req.user.id).length) {
            return res.status(401).json({msg: 'Post has not been like yet'})
        }

        //  Get remove index
        const removeIndex = post.likes.map(like => String(like.user).indexOf(req.user.id))

        post.likes.splice(removeIndex, 1)
        await post.save()

        res.json(post.likes)

    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    GET api/posts/comment/:id
// desc     Comment on a post
// access   Private
router.get('/comment/:id', [middlewareAuth,
        [
            check('text', 'Text is required').not().isEmpty()
        ]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            }
            post.comments.unshift(newComment)
            await post.save()

            res.json({msg: 'Comment added', comment: newComment.text, comments: post.comments})

        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Post not found'})
            }
            res.status(500).send('Server Error')
        }
    }
)

// route    DELETE api/posts/comment/:id/:comment_id    // post Id & comment Id
// desc     Delete comment
// access   Private
router.delete('/comment/:id/:comment_id', middlewareAuth, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            console.log(post.comments.find(comment => comment.id === req.params.comment_id))
            //  Pull out comment
            const comment = post.comments.find(comment => comment.id === req.params.comment_id)

            //  Check if comment does not exists
            if (!comment) {
                return res.status(404).json({msg: 'Comment does not exist'})
            }

            //  Check comment owner
            if (String(comment.user) !== req.user.id) {
                return res.status(401).json({msg: 'You can`t remove that'})
            }

            //  Get remove index
            const removeIndex = post.comments.map(comment => String(comment.user).indexOf(req.user.id))

            post.comments.splice(removeIndex, 1)
            await post.save()

            res.json({msg: 'Comment removed', comments: post.comments})

        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server Error')
        }
    }
)

module.exports = router