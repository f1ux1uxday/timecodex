const express = require('express')
// Import body-parser?
const cors = require('cors')

const app = module.exports = express()
// App.user(bodyParser.json())
app.disable('x-powered-by')
app.use(cors())
app.set('port', process.env.PORT || 3000)

app.get('/:dateParam', function(request, response) {
  // /:Anyword is a URL parameter, pretty cool
  // Held in request.params object
  console.log('Response received.')
  let months = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December',]

  let dateParam = request.params.dateParam

  let naturalizer = (unixTime) => {
    let date = new Date(unixTime * 1000)

    let month = months[date.getMonth()]
    let day = date.getDate()
    let year = date.getFullYear()
    let naturalizedDate = `${month} ${day}, ${year}`

    return naturalizedDate
  }

  if (!isNaN(dateParam)) {
    response.json({
      unix: dateParam,
      natural: naturalizer(dateParam),
    })
  }

  if (isNaN(dateParam)) {
    let splitDateArray = dateParam.split(' ')
    let dayNumCheck = /[0-9]{1,2},$/
    if (months.includes(splitDateArray[0]) === true &&
      dayNumCheck.test(splitDateArray[1]) === true &&
      Number(splitDateArray[2]) > 1969) {
      console.log(splitDateArray[1])
      response.json({
        unix: new Date(dateParam).getTime() / 1000,
        natural: dateParam,
      })
    } else {
      response.json({
        unix: null,
        natural: null,
      })
    }
  }
})

const server = app.listen(function() {
  // Since 'port' is set in app above, no need to specify port in listen call
  console.log('server listening on port', server.address().port)
})
