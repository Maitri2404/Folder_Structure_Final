const fs = require('fs');

function isEmpty(username, password, fullname, email, phoneNumber, department) {
    if (!username || !password || !fullname || !email || !phoneNumber || !department) {
      return true;
    }
    return false;
  }

  function getUsersFromFile() {
    const data = fs.readFileSync('./routes/users/users.json', 'utf-8');
    return JSON.parse(data);
  }

  function validatePhoneNumber(phoneNumber){
    const regex=/([987]{1})([0-9]{3})([1-9]{4})([0-9]{2})/;
    return regex.test(phoneNumber)
  }

  function validateLogin(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ Error: "Usernme and password are required" })
    }
    next();
  }

module.exports={isEmpty, getUsersFromFile ,validatePhoneNumber, validateLogin}