const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// How would this look like if moment.js is used?
// Add a basic web page with input field and call API

app.get('/api/timestamp/:date_string', (req, res) => {
  const dateParam = req.params.date_string
  const dateNum = Number(dateParam)
  const dateString = Date.parse(dateParam)

  if(isNaN(dateNum) && isNaN(dateString)){
    return res.send({ error: 'Invalid Date'})
  }

  const convertDate = dateNum ? new Date(dateNum) : new Date(dateString)
  const date = dateParam ? convertDate : new Date()

  res.jsonp({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

app.listen(port, () => {
  console.log('App listening on port ' + port)
})