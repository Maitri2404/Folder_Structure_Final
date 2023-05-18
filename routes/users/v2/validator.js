const { isUserUnique } = require('../middleware/middleware')
const { isEmpty, validatePhoneNumber } = require('../../../helper/helper')
const { message, status } = require('../../../logMessages/message')

function validateUsername(username) {
  const regex = /^[a-z][\w+@#$%_.]/
  return regex.test(username)
}

function validatePassword(password) {
  const regex = /^[A-Z][\w+@#$%_.]{8,16}$/
  return regex.test(password)
}

function validateAddUser(req, res, next) {
  const { fullName, username, password, email, phoneNumber, department } =
    req.body
  if (isEmpty(username, password, fullName, email, phoneNumber, department)) {
    return res.status(status.badRequest).json(message.checkAddUser)
  } else if (!isUserUnique(username, email)) {
    return res.status(status.badRequest).json(message.checkUniqueUser)
  } else if (!validateUsername(username)) {
    return res.status(status.badRequest).json(message.validUserNameV2)
  } else if (!validatePassword(password)) {
    return res.status(status.badRequest).json(message.validPasswordV2)
  } else if (!validatePhoneNumber(phoneNumber)) {
    return res.status(status.badRequest).json(message.validPhoneNumber)
  }
  next()
}

function validateUpdateUsername(req, res, next) {
  const { username } = req.body
  if (!username) {
    return res.status(status.badRequest).json(message.usernameRequire)
  } else if (!validateUsername(username)) {
    return res.status(status.badRequest).json(message.validUserNameV2)
  } else {
    next()
  }
}

function validateUpdatePassword(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(status.badRequest)
      .json(message.userNameAndPasswordRequire)
  } else if (!validatePassword(password)) {
    return res.status(status.badRequest).json(message.validPasswordV2)
  } else {
    next()
  }
}

module.exports = {
  validateAddUser,
  validateUpdateUsername,
  validateUpdatePassword,
}
