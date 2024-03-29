const express = require('express')
const path = require('path')

const mongoose = require('mongoose')
const connect_flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')

//Configuring App
const app = express()

app.use(express.json())


// app.use(express.static('public'))
app.use(cookieParser())
// using dotenv module for environment
require('dotenv').config();

const PORT = process.env.PORT || 3000
// Mongoose connection
mongoose
    .connect("//127.0.0.1:27017/gyandeep", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useFindAndModify: false,
        // useCreateIndex: true,
    })
    .then(() => console.log('Connected to mongo server'))
    .catch((err) => console.error(err))

const publicDirectory = path.join(__dirname, '../public')
    // console.log(publicDirectory);
app.use(express.static(publicDirectory))

//Setting EJS view engine
app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'ejs')

//app.use(expressLayouts);
//body parser
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        // secret: process.env.JWT_SECRET,
        secret:'gyandeep',
        resave: true,
        saveUninitialized: true,
    })
)

app.use(connect_flash())

// global var
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')

    next()
})

//Setup for rendering static pages


//Routes
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/user')
const { log } = require('console')
app.use('/',indexRoutes)
app.use('/user',userRoutes)

//Start the server
app.listen(PORT, () => {
    console.log('Server listening on port', PORT)
})


// const  User = require('./models/User')
//  const databasedlt= async()=>{
//     const user = await User.find({email:"debojyoti76@gmail.com"})
//     user.forEach(async(data)=>{
//          await User.findByIdAndDelete(data._id)
//     })
//     console.log("deleted")
//  }
//  databasedlt()


// const User= require('./models/Group')
// const databasedlt= async()=>{
//    const user = await User.find({})
//    user.forEach(async(data)=>{
//         await User.findByIdAndDelete(data._id)
//    })
//    console.log("deleted")
// }
// databasedlt()



//  const Relations= require('./models/Relations')
// const databasedlt= async()=>{
//    const user = await Relations.find({_id: "60259290d60e72021ba9ed4a"})
//    user.forEach(async(data)=>{
//         await Relations.findByIdAndDelete(data._id)
//    })
//    console.log("deleted")
// }
// databasedlt()



