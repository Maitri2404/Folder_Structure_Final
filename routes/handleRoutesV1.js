const { handleGetUsers, handleAddUser, handleUpdateUser, handleUpdatePassword,handleLogin } = require('./users/v1/controller');
const { authenticateToken } =require('./users/middleware/middleware');
const { validateAddUser, validateLogin } =require('./users/v1/validator')
const routerV1=require('express').Router();

routerV1.get('/v1/getUsers',authenticateToken,handleGetUsers);
routerV1.post('/v1/addUser',validateAddUser,handleAddUser);
routerV1.post('/v1/login',validateLogin,handleLogin)
routerV1.put('/v1/updateUsername/:username',authenticateToken,handleUpdateUser);
routerV1.put('/v1/updatePassword/:username',authenticateToken,handleUpdatePassword)
module.exports={routerV1}