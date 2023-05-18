const fs = require('fs')
const config = require('../../../config/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRound = 10
const { getUsersFromFile } = require('../../../helper/helper')
const { message, status } = require('../../../logMessages/message')

function addUser(req, res) {
  const { password } = req.body
  const hashedPassword = bcrypt.hashSync(password, saltRound)
  req.body.password=hashedPassword
  const data = getUsersFromFile()
  data.users.push(req.body)
  fs.writeFileSync('./routes/users/users.json', JSON.stringify(data))
  return res.status(status.created).json(message.registerUserSuccess)
}

function getUsers(req, res) {
  const data = getUsersFromFile()
  const users = data.users
  return res
    .status(status.success)
    .json({ message: message.getUsers, users: users })
}

function updateUsername(req, res) {
  const { username } = req.body
  const data = getUsersFromFile()
  const user = data.users.find((user) => user.username === req.params.username)
  if (!user) {
    return res.status(status.notFound).json(message.userNotFound)
  }
  user.username = username
  fs.writeFileSync('./routes/users/users.json', JSON.stringify(data))
  return res.status(status.success).json({ message: message.usernameUpdate })
}

function updatePassword(req, res) {
  const { password } = req.body
  const hashedPassword = bcrypt.hashSync(password, saltRound)
  const data = getUsersFromFile()
  const user = data.users.find((user) => user.username === req.params.username)
  if (!user) {
    return res.status(status.notFound).json(message.userNotFound)
  } else {
    user.password = hashedPassword
    fs.writeFileSync('./routes/users/users.json', JSON.stringify(data))
    return res.status(status.success).json(message.updatePassword)
  }
}

function login(req, res) {
  const { username, password } = req.body
  const data = getUsersFromFile()
  const user = data.users.find((user) => user.username === req.body.username)
  console.log(user);
  if (!user) {
    return res.status(status.notFound).json(message.userNotFound)
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({ error: err })
      } else if (result) {
        const token = jwt.sign(
          { username: user.username },
          config.SECRET_KEY,
          { expiresIn: '1h' }
        )
        return res.json({ token })
      } else {
        return res.status(status.unAuthorized).json(message.invalidPassword)
      }
    })
  }
}

module.exports = { addUser, getUsers, updateUsername, updatePassword, login }
