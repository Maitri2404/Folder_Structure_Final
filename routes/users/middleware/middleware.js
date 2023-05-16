const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getUsersFromFile() {
  const data = fs.readFileSync('./routes/users/users.json', 'utf-8');
  return JSON.parse(data);
}

// function isUserUnique(user) {
//   const users = getUsersFromFile().users;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i].username === user.username || users[i].email === user.email) {
//       return false;
//     }
//   }
//   return true;
// }
function isUserUnique(username,email) {
  const users = getUsersFromFile().users;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username || users[i].email === email) {
      return false;
    }
  }
  return true;
}

function isAuthorized(department) {
  if (department === 'node') {
    return true;
  }
  return false;
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({error:'jwt invalid'});
      }
      req.username = decoded.username;
      const user = getUsersFromFile().users.find((user) => user.username === decoded.username);
      console.log(user)
      if (!user || !isAuthorized(user.department)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    next();
  });
}

module.exports = {
  getUsersFromFile,
  isUserUnique,
  authenticateToken,
  isAuthorized
};
