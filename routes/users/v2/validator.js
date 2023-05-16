const { isUserUnique } = require('../middleware/middleware');
const { validatePhoneNumber } = require('../v1/validator');

function validateAddUsername(username) {
  const regex = /^[a-z][\w+@#$%_.]/;
  return regex.test(username);
}

function validateAddPassword(password) {
  const regex = /^[A-Z][\w+@#$%_.]{8,16}$/;
  return regex.test(password);
}

function validateUpdateUsername(username) {
  const regex = /^[A-Z+]{3,9}$/;
  return regex.test(username);
}

function validateUpdatePassword(password) {
  const regex = /^[0-9+]{8,16}$/;
  return regex.test(password)
}

function isEmpty(username, password, fullname, email, phoneNumber, department) {
  if (!username || !password || !fullname || !email || !phoneNumber || !department) {
    return true;
  }
  return false;
}

function validateAddUser(req, res, next) {
  const { fullname, username, password, email, phoneNumber, department } = req.body;
  if (isEmpty(username, password, fullname, email, phoneNumber, department)) {
    return res.status(400).json({ error: 'All fields are required...!!' });
  } else if (!isUserUnique(username, email)) {
    return res.status(400).json({ error: 'Username or email already exists...' });
  } else if (!validateAddUsername(username)) {
    return res.status(400).json({ error: 'Invalid username. It should contain all small letter, and one symbol.' });
  } else if (!validateAddPassword(password)) {
    return res.status(400).json({ error: 'Invalid password. It should contain at least one capital letter ,at least one symbol, and a total length of 16 characters.' });
  } else if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: "Please enter valid phone number" })
  }
  next();
}

module.exports = { validateAddUsername, validateAddPassword, validateUpdateUsername, validateUpdatePassword, isEmpty, validateAddUser };
