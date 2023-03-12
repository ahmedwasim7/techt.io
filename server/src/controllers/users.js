const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const signup = (req, res) => {
    res.json({
        message: 'Signup successful',
        user: req.user,
    })
}

const login = async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.')
                return next(error)
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
                return res.json({ token })
            })
        } catch (error) {
            return next(error)
        }
    })(req, res, next)
}

const getName = async (req, res) => {
    try {
        const {id} = req.body
        const userId = await User.findById(id)
        res.status(200).json(userId)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
  }

module.exports = { signup, login, getName }
