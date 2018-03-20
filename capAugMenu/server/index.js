
const express = require('express')
const app =  express()
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 1337
app.listen(PORT, ()=>{console.log(`I am listenign on ${PORT}`)})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use((req,res,next) => {
    console.log(req.path)
    next()
})


app.use(express.static(path.join(__dirname, '../js/res/emoji_smile')))

