const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        date: {
            type: Date,
            default: Date.now
        },
        company: {
            type: String
        },
        website: {
            type: String
        },
        location: {
            type: String
        },
        status: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            required: true
        },
        bio: {
            type: String
        },
        github: {
            type: String
        },

        experience: [
            {
                title: {
                    type: String
                },
                company: {
                    type: String
                },
                location: {
                    type: String
                },
                from: {
                    type: Date
                },
                to: {
                    type: Date,
                    default: Date.now
                },
                current: {
                    type: Boolean
                },
                description: {
                    type: String
                },
            }
        ],

        education: [
            {
                school: {
                    type: String
                },
                degree: {
                    type: String
                },
                location: {
                    type: String
                },
                from: {
                    type: Date
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean
                },
                description: {
                    type: String
                },
            }
        ],

        social: {
            vk: {
                type: String
            },
            youtube: {
                type: String
            },
            facebook: {
                type: String
            },
            twitter: {
                type: String
            },
            linkedin: {
                type: String
            },
            instagram: {
                type: String
            },
        },
    }
)

module.exports = ProfileInfo = mongoose.model('profile', ProfileSchema)