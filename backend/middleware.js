const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');


function authMiddleware(req, res, next){
    const token = req.headers.authorization;
    //gets headers authorization string

    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Error: Invalid user"
        })
    }
    //check if it contains bearer if not then invalid user, as containing bearer signifies the token is of registered user
    const words = token.split(" ");
    const jwtToken = words[1];
    //split the token

    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedValue.userId){
            req.userId = decodedValue.userId
            next();
        }
        else{
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    //check if the token after jwt.verify contains "userId" as while creating the token we jwt.sign({userID}, JWT_SECRET)
    //if contains then valid and proccess continues in the router else error 
    catch(error){
        res.json({
            error: "Incorrect inputs"
        })
    }
}

module.exports = authMiddleware;