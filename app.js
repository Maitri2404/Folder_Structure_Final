const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config()
const config = require('./config/config')
const routerV1  = require('./routes/handleRoutesV1')
const routerV2  = require('./routes/handleRoutesV2')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(routerV1)
app.use(routerV2)

app.get('/healthCheck', (req, res) => {
  res.status(200).json({ message: 'Working' })
})

app.all('*', (req, res) => {
  return res.json({ Error: 'Route not found' })
})

app.listen(config.PORT || 3000, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
