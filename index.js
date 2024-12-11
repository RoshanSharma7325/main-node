const express = require('express')
const userRoute = require('./src/routes/userRoutes')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const app = express()
require("./src/config/db")
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const limit = rateLimit({
    windowMs: 60*1000,
    max: 100,
    massage:'Too many requests from this IP, please try again later',
})

app.use(limit)   
app.use(userRoute)
app.listen(8090,()=>{
    console.log('sarver connect');
    
})
