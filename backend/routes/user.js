const express = require('express');
const signup = require('../type');
const updateBody = require('../type')
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

const router = express.Router();


route.post('/signup', async (req,res)=>{
    const createPayload= req.body;
    const parsePayload = signup.safeParse(createPayload);

    if(!parsePayload){
        res.status(411).json({
            msg: "Email already taken / Invalid input"
        })
        return;
    }

    const existingUser = await User.findOne({
        username: username
    })

    if(existingUser){
        res.status(411).json({
            msg: "Email already taken / Invalid inputs"
        })
    }

    await User.create({
        username: createPayload.username,
        passsword: createPayload.passsword,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName
    })

    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        msg: "user created successfully",
        token: token
    })
})

route.post('/signin', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    })

    if(user){
        const token = jwt.sign({userId}, JWT_SECRET);

        res.json({
            token: token
        })
    }
    else{
        res.status(404).json({
            msg: "incorrect email and password"
        })
    }
})

router.put('/', authMiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
    
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        msg: "Updated successfully"
    })
})


module.exports = router;