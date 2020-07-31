const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// How would this look like if moment.js is used?
// Add a basic web page with input field and call API
// Use hbs and create basic Footer / Header template 
// Create about view to describe the app

app.get('/api/timestamp/:date_string', (req, res) => {
  const dateParam = req.params.date_string
  const dateParse = dateParam.match(/\d{4}-\d{2}-\d{2}/gm) ? Date.parse(dateParam) : Number(dateParam)
  const date = new Date(dateParse)

  const dateUnix = date.getTime()
  const dateUTC = date.toUTCString()

  if(isNaN(dateParse) || !dateUnix || dateUTC === "Invalid Date"){
    return res.send({ error: 'Invalid Date'})
  }

  res.jsonp({
    unix: dateUnix,
    utc: dateUTC
  })
})

app.listen(port, () => {
  console.log('App listening on port ' + port)
})