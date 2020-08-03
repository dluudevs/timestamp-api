const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Add a basic web page with input field and call API
// Use hbs and create basic Footer / Header template 
// Create about view to describe the app
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.use(express.static(publicPath))
// setup express to use hbs
app.set('view engine', 'hbs')
// render method will look in this path for views
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Timestamp'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About'
  })
})

// question mark after param means it's optional. this route accepts an empty date_string param
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateParam = req.params.date_string
  const dateParse = () => dateParam.match(/\d{4}-\d{2}-\d{2}/gm) ? Date.parse(dateParam) : Number(dateParam)
  
  const date = !dateParam ? new Date() : new Date(dateParse())
  const dateUnix = date.getTime()
  const dateUTC = date.toUTCString()
  
  // this will also handle invalid date_string formats
  if(!dateUnix || dateUTC === "Invalid Date"){
    return res.send({ error: 'Invalid Date'})
  }

  res.send({
    unix: dateUnix,
    utc: dateUTC
  })
})

app.listen(port, () => {
  console.log('App listening on port ' + port)
})