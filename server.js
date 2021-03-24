const express = require('express')
require('dotenv').config()
const ShortUrl = require('./models/shorturl')
const mongoose = require('mongoose')
const app = express()




mongoose.connect(process.env.MONGO_DB ||'mongodb://mongo/linkShortner',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
//setting the View engine

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

//get Route
app.get('/',async(req,res)=>{
  const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls : shortUrls})
})

//post route

app.post('/shorturl',async(req,res)=>{
 await ShortUrl.create({full:req.body.fullUrl})
 res.redirect('/')
})

app.get('/:shortUrl',async(req,res)=>{
   const shortUrl = await  ShortUrl.findOne({short : req.params.shortUrl})

   if(shortUrl == null ) return res.sendStatus(404)

   shortUrl.clicks++
   shortUrl.save()
   res.redirect(shortUrl.full)
})

//listening 
app.listen(process.env.PORT||3000,()=>{
    console.log(`server running `)
})


