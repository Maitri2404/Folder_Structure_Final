const {
  getUsers,
  addUser,
  updateUsername,
  updatePassword,
  login,
} = require('./users/v2/controller')
const { authenticateToken } = require('./users/middleware/middleware')
const {
  validateAddUser,
  validateUpdateUsername,
  validateUpdatePassword,
} = require('./users/v2/validator')
const { validateLogin } = require('../helper/helper')
const routerV2 = require('express').Router()

routerV2.get('/v2/getUsers', authenticateToken, getUsers)
routerV2.post('/v2/addUser', validateAddUser, addUser)
routerV2.post('/v2/login', validateLogin, login)
routerV2.put(
  '/v2/updateUsername/:username',
  validateUpdateUsername,
  authenticateToken,
  updateUsername
)
routerV2.put(
  '/v2/updatePassword/:username',
  validateUpdatePassword,
  authenticateToken,
  updatePassword
)

module.exports =  routerV2 
