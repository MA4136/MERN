const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')
const {check, validationResult} = require('express-validator')
const middlewareAuth = require('../../middleware/authentication')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// route    GET api/profile/me
// desc     Get current users profile
// access   Private
router.get('/me', middlewareAuth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json(['There is no profile for this user'])
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// route    POST api/profile
// desc     Create or update user profile
// access   Private
router.post('/', [middlewareAuth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(el => el.msg))
        }

        const {
            bio, date, company, website, location, github, status, skills,
            vk, youtube, facebook, twitter, linkedin, instagram
        } = req.body

        //  Build Profile object
        const profileFields = {}
        profileFields.user = req.user.id
        if (bio) profileFields.bio = bio
        if (date) profileFields.date = date
        if (status) profileFields.status = status
        if (github) profileFields.github = github
        if (website) profileFields.website = website
        if (company) profileFields.company = company
        if (location) profileFields.location = location
        if (skills) {
            typeof skills === 'string' ?
                profileFields.skills = skills.split(',').map(el => el.trim()) :
                profileFields.skills = skills
        }

        //  Build Profile object
        profileFields.social = {}
        if (vk) profileFields.social.vk = vk
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (linkedin) profileFields.social.linkedin = linkedin
        if (instagram) profileFields.social.instagram = instagram
        try {
            let profile = await Profile.findOne({user: req.user.id})

            //  Update
            if (profile) {
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                return res.json(profile)
            }

            //  Create
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)

        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server Error')
        }
    }
)

// route    GET api/profile
// desc     Get all profiles
// access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    GET api/profile/user/:user_id
// desc     Get profile by user id
// access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({msg: 'Profile is not found'})
        res.json(profile)
    } catch (e) {
        console.error(e.message)
        if (e.kind === 'ObjectId') return res.status(400).json({msg: 'Profile is not found'})
        res.status(500).send('Server Error')
    }
})

// route    DELETE api/profile
// desc     Delete profile, user and posts
// access   Private
router.delete('/', middlewareAuth, async (req, res) => {
    try {
        //  Remove Profile
        await Profile.findOneAndRemove({user: req.user.id})
        //  Remove user
        await User.findOneAndRemove({_id: req.user.id})
        res.json({msg: 'User removed'})
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    PUT api/profile/experience
// desc     Add profile experience
// access   Private
router.put('/experience', [middlewareAuth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
        ]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {title, company, location, from, to, current, description} = req.body
        const newExperience = {title, company, location, from, to, current, description}

        try {
            const profile = await Profile.findOne({user: req.user.id})
            profile.experience.unshift(newExperience) // Create Many
            // profile.experience = newExperience // Create/Update One
            await profile.save()
            res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server Error')
        }
    }
)

// route    DELETE api/profile/experience/:exp_id
// desc     Delete experience from profile
// access   Private
router.delete('/experience/:exp_id', middlewareAuth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //  Get remove index
        const removeIndex = profile.experience.map(el => el.id).indexOf(req.params.exp_id)
        if (removeIndex !== -1) {
            profile.experience.splice(removeIndex, 1)
            await profile.save()
            res.json(profile)
        } else res.json({mgs: 'No experience for this Id'})
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    PUT api/profile/education
// desc     Add profile education
// access   Private
router.put('/education', middlewareAuth, async (req, res) => {
        console.log(req)

        const {school, degree, location, from, to, current, description} = req.body
        const newEducation = {school, degree, location, from, to, current, description}

        try {
            const profile = await Profile.findOne({user: req.user.id})
            profile.education.unshift(newEducation) // Create Many
            // profile.education = newEducation // Create/Update One
            await profile.save()
            res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Server Error')
        }
    }
)

// route    DELETE api/profile/education/:exp_id
// desc     Delete education from profile
// access   Private
router.delete('/education/:exp_id', middlewareAuth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //  Get remove index
        const removeIndex = profile.education.map(el => el.id).indexOf(req.params.exp_id)
        if (removeIndex !== -1) {
            profile.education.splice(removeIndex, 1)
            await profile.save()
            res.json(profile)
        } else res.json({mgs: 'No education for this Id'})
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

// route    GET api/profile/github/:username
// desc     Get user repos from Github
// access   Public
router.get('/github/:username', (req, res) => {
    try {
        const clientId = config.get('githubClientID')
        const clientSecret = config.get('githubClientSecret')

        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        }
        request(options, (error, response, body) => {
            if (error) console.error(error)
            if (response.statusCode !== 200) {
                return res.status(404).json({msg: 'Github profile was not found'})
            }
            res.json(JSON.parse(body))
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router