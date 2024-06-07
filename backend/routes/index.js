const express = require('express');
const userRouter = require('./user')
const router = express.Router();


router.use('/user', userRouter)

router.get('/', async , (req,res)=>{

})


module.exports  = router;