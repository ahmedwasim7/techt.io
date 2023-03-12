const { body, validationResult } = require('express-validator')
exports.validate = (method) => {
    // use method for validation
    switch (method) {
        case 'signup': {
            return [
                body('email', 'there should be a proper valid email')
                    .exists()
                    .isEmail(),
                body('name', 'there should be a proper username')
                    .exists()
                    .isLength({ min: 2 }),
                body(
                    'password',
                    'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
                )
                    .exists(),

                (req, res, next) => {
                    const errors = validationResult(req)
                    if (!errors.isEmpty())
                        return res.status(422).json({ errors: errors.array() })
                    next()
                },
            ]
        }
    }
}
