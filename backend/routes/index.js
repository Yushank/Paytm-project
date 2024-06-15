const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account')
const router = express.Router();


router.use('/user', userRouter);
//any request from /api/v1/user will go to userRouter where /api/v1/user post and get requests will be handeled
router.use('/account', accountRouter);
// and any request from /api/v1/account will go to accountRouter where /api/v1/account requests will be handeled


module.exports  = router;