const express = require('express');
const { User, Account } = require('../db');
const authMiddleware = require('../middleware');
const mongoose = require("mongoose")

const router = express();

router.get('/balance', authMiddleware, async (req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance : account.balance
    })
})
//getting the account from Account database, and fetching there balance



router.post('/transfer', authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();
    //this session make sures that only one transaction is made when under the session, as if this procedure is not followed one can does two transaction simultaneously
    //and that can result in balance error like if same amount transfered to two different accounts at same time, the receiver accounts will receive the amounts but the sender account might only deduce one amount

    session.startTransaction();
    const {amount, to} = req.body;
    //getting amount and userid of "to" whom we want to send money

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);// this session(session) ensures that no other update is made to the account information like balance while transaction is in proccess
    //get user account

    if(account.balance < amount){
        res.status(400).json({
            msg: "Insufficient balance"
        })
    }
    //check if it's balance not less then the amount we want to send

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);
    //get receiver account

    if(!toAccount){
        await session.AbortTransaction() //not found receiver account then abort transaction
        res.status(400).json({
            msg: "Invalid Account"
        })
    }
    //check if its account is there in the database

    await Account.updateOne({
        userId: req.userId
    },{
        $inc: {
            balance: -amount
        }
    }).session(session);
    //deduce amount from user/sender account

    await Account.updateOne({
        userId: to
    },{
        $inc: {
            balance: +amount
        }
    }).session(session);
    //credit amount in receiver account

    await session.commitTransaction() //everything will execute with commiting session
    res.status(200).json({
        msg: "Transaction successfull"
    })
})

module.exports = router