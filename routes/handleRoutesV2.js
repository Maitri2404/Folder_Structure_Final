const { handleGetUsers, handleAddUser, handleUpdateUser, handleUpdatePassword, handleLogin } = require('./users/v2/controller');
const { authenticateToken } = require('./users/middleware/middleware');
const { validateAddUser } =require('./users/v2/validator')
const routerV2=require('express').Router();

routerV2.get('/v2/getUsers', handleGetUsers);
routerV2.post('/v2/addUser', validateAddUser, handleAddUser);
routerV2.post('/v2/login',handleLogin)
routerV2.put('/v2/updateUsername/:username', authenticateToken, handleUpdateUser);
routerV2.put('/v2/updatePassword/:username', authenticateToken, handleUpdatePassword);

module.exports={routerV2};
