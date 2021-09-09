
const mongoose = require('mongoose')
const dotenv  = require('dotenv') ;
dotenv.config()
// connect to MongoDB 
const URI = process.env.MONGODB_URL
const dbconnect =mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true

}, err => {
    if(err){
        console.log("error in db connection", err)
    }else {
        console.log("Database connected")
    }
} )

