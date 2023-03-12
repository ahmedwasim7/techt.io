const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const { Schema } = mongoose
// validation
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'invalid email'],
    },
    name: { type: String, required: true, minLength: 2 },
    password: {
        type: String,
        required: true,
        min: 8,
    },
})

UserSchema.pre('save', async function (next) {
    const user = this
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

UserSchema.methods.isValidPassword = async function (password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)

    return compare
}
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
