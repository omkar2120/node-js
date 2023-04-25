const mongoose =  require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
})