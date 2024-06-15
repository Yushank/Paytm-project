const express = require("express");
const mainRouter = require("./routes/index.js");
const cors = require('cors')


const app = express();


app.use(express.json())

app.use(cors());

app.use('/api/v1', mainRouter);

//any request from /api/v1 will go to mainRouter where all the post and get requests will be handeled
// and any request from /api/v1/user will go to userRouter where /api/v1/user post and get requests will be handeled
//we can also write it here directly as app.userr('/api/v1/user', userRouter)
//it's just we wrote it in the routes/index.js file

app.listen(3000);