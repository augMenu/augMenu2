'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path') //don't need to npm install

const foodRoutes = require('./routes/food');
const db = require('./models').db

const app = express();
module.exports = app;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'./public')))  //not needed for this example, its for serving html files
app.use(morgan('dev'))


app.use('/foods', foodRoutes)


//error handling //
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message);
})

//set up server at the end -- we want the middleware going before the server starts listening
db.sync({force: false})
.then(() => {
  console.log('our database has successfully synced')
  app.listen(1337, () => {
   console.log('Server is listening at port 1337...')
  })
})
.catch(() => {
	console.log('something went wrong when we tried to sync the database')
})


// const express = require('express')
// const app =  express()
// const bodyParser = require('body-parser')
// const path = require('path')
// const db = require('./db')
// const PORT = 1337;
// // const PORT = process.env.PORT || 1337
// // app.listen(PORT, ()=>{console.log(`I am listenign on ${PORT}`)})


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}))

// app.use((req,res,next) => {
//     console.log(req.path)
//     next()
// })

// app.use(express.static(path.join(__dirname, '../js/res/emoji_smile')))

// // error handling endware
// app.use((err, req, res, next) => {
//     console.error(err)
//     console.error(err.stack)
//     res.status(err.status || 500).send(err.message || 'Internal server error.')
//   })



// db.sync() 
// .then(() => {
//   console.log('db synced')
//   app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
// });





