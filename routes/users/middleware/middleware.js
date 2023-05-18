const jwt = require('jsonwebtoken')
const { getUsersFromFile } = require('../../../helper/helper')
require('dotenv').config()
const config = require('../../../config/config')
const { message, status } = require('../../../logMessages/message')

function isUserUnique(username, email) {
  const users = getUsersFromFile().users
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username || users[i].email === email) {
      return false
    }
  }
  return true
}

function isAuthorized(department) {
  if (department === 'node') {
    return true
  }
  return false
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(status.unAuthorized).json(message.unAuthorized)
  }
  jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(status.forbidden).json(message.forbiddenAccess)
    }
    req.username = decoded
    const user = getUsersFromFile().users.find(
      (user) => user.username === decoded.username
    )
    console.log(user)
    if (!user || !isAuthorized(user.department)) {
      return res.status(status.forbidden).json(message.forbiddenAccess)
    }
    next()
  })
}

module.exports = {
  isUserUnique,
  authenticateToken,
  isAuthorized,
}
