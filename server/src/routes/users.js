const express = require('express')
const passport = require('passport')
const userValidation = require('../middlewares/user-validation')
const router = express.Router()

const { signup, login, getName } = require('../controllers/users')
router.post(
    '/signup',
    userValidation.validate('signup'),
    passport.authenticate('signup', { session: false }),
    signup
)
router.post('/login', login)

router.post('/name', getName)

module.exports = router
