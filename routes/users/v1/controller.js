const fs = require('fs');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const { getUsersFromFile } = require('../middleware/middleware');
const { validateUsername, validatePassword } = require('./validator');

function handleAddUser(req, res,next) {
  const { fullname, username, password, email, phoneNumber, department } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  const user = {
    fullname,
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    department,
  };

    const data = getUsersFromFile();
    data.users.push(user);
    fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
    return res.status(201).json({ message: 'User created successfully' });
}

function handleGetUsers(req, res) {
  const data = getUsersFromFile();
  const users = data.users;
  return res.status(200).json({ message: 'Get users successfully', users });
}

function handleUpdateUser(req, res) {
  const { username } = req.body;
  if (!validateUsername(username)) {
    return res.status(400).json({
      error: 'Invalid username. It should have at least one capital letter, other numbers',
    });
  } 
  else {
    const data = getUsersFromFile();
    const user = data.users.find((user) => user.username === req.params.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      user.username = username;
      fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
      return res.status(200).json({ message: 'Username updated successfully' });
    }
  }
}

function handleUpdatePassword(req, res) {
  const { username, password } = req.body;
  // console.log("req", req.body)
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid password. It should have at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
    });
  } else {
    const data = getUsersFromFile();
    const user = data.users.find((user) => user.username === req.params.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      user.password = hashedPassword;
      fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
      return res.status(200).json({ message: 'Password updated successfully' });
    }
  }
}

function handleLogin(req, res) {
  const { username, password } = req.body;
  const data = getUsersFromFile();
  const user = data.users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
   else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.json({ error: err });
      } else if (result) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    });
  }
}

module.exports = { handleAddUser, handleGetUsers, handleUpdateUser, handleUpdatePassword, handleLogin };
