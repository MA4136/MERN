const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const middlewareAuth = require('../../middleware/authentication')

const Profile = require('../../models/Profile')

// route    GET api/profile/me
// desc     Get current users profile
// access   Private
router.get('/me', middlewareAuth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'})
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
router.post('/',
    [middlewareAuth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
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
            profileFields.skills = skills.split(',').map(el => el.trim())
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
                profile = await Profile.findByIdAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
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
    })

module.exports = router