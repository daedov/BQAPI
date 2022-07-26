const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const authRouter = require('./auth')


router.use('/users', usersRouter)
router.use('/auth', authRouter)

module.exports= router