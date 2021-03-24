const express = require('express')
require('dotenv').config()
const app = express()


//setting the View engine

app.set('view engine','ejs')

//get Route
app.get('/',(req,res)=>{
    res.render('index')
})


//listening 
app.listen(process.env.PORT,()=>{
    console.log(`server running at ${process.env.PORT}`)
})
