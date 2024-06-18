const express = require('express');
// const signup = require('../type');
const updateBody = require('../type')
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

const router = express.Router();
const zod = require('zod');

const signup = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post('/signup', async (req,res)=>{
    const createPayload= req.body;
    const parsePayload = signup.safeParse(createPayload);
    // get the inputs with req.body the parse with zod

    if(!parsePayload){
        return res.status(411).json({
            msg: "Email already taken / Invalid input"
        })
    }
    //if parsing not successful then email already taken or wrong input

    const existingUser = await User.findOne({
        username: req.body.username
    })
    //if parsed succesfully then we find if username is already there

    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken / Invalid inputs"
        })
    }
    //existingUser also means email already taken

    const user = await User.create({
        username: createPayload.username,
        password: createPayload.password,
        firstName: createPayload.firstName,
        lastName: createPayload.lastName
    })
    //if not then new user is created in database

    const userId = user._id;
    
    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000     // giving the user a random initial balance when they sign up
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        msg: "user created successfully",
        token: token
    })
    //token also generated
})

router.post('/signin', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    })

    
    if(user){
        const token = jwt.sign({userId: user._id}, JWT_SECRET);

        res.json({
            token: token
        })
        return
    }
    else{
        res.status(404).json({
            msg: "incorrect email and password"
        })
    }
})

router.put('/', authMiddleware, async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)
    //here req.body is the inputs we will get from frontend , then we will parse it with zod, if success we will update the information
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

router.get('/bulk', async (req, res)=>{
    const filter = req.query.filter || ""; //input or "" which means search the input initials name or empty space means a list of every name
    //getting the input as filter
    // this route will work like in websites where we search for a name in the searchbar like any social media platform or in this case a pytm application
    //where to send someone money we search there name and as we type the initials of their name the list of names appear with similar initials
    //if type "yu" a list containg " yushank, yukta, yuvraj..." or "ank" will show endings of words like "yushank, sashank..."
    //so this filter will take the words we type and then User.find will find the names accordingly using the filter

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex" : filter  //$regex lets us pattern matching in this case filtering based on input 
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;