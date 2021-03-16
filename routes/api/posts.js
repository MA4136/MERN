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
            const user = await User.findById(req.user.id).select('-password')
            const newPost = new Post({
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            })

            const post = await newPost.save()
            res.json({msg: 'Post created', post: post.text})

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
            return res.json({msg: 'You can`t remove that'})
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

module.exports = router