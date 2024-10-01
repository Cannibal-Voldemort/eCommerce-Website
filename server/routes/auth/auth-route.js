const express = require('express')
const {registerUser} = require('../../controllers/auth/auth-controller')
const {tryCatchSimple} = require('../../utilities/errorhandling')
const router = express.Router()

router.post('/signup', tryCatchSimple(registerUser) )


module.exports = router;