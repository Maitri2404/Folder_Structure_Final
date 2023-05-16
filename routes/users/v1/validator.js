const {isUserUnique}=require('../middleware/middleware')

function validateUsername(username) {
    const regex = /^[A-Z][A-Z0-9]+$/;
    return regex.test(username)
  }
  
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_]){8,16}/;
    return regex.test(password)
  }

  function validatePhoneNumber(phoneNumber){
    const regex=/([987]{1})([0-9]{3})([1-9]{4})([0-9]{2})/;
    return regex.test(phoneNumber)
  }

  function isEmpty(username, password, fullname, email, phoneNumber, department) {
    if (!username || !password || !fullname || !email || !phoneNumber || !department) {
      return true;
    }
    return false;
  }

  function validateAddUser(req,res,next){
    const { fullname, username, password, email, phoneNumber, department } = req.body;

    if(isEmpty(fullname,username,password,email,phoneNumber,department)){
      return res.status(400).json({ error: 'All fields are required...!!' });
    }
    else if (!isUserUnique(username,email)) {
      return res.status(400).json({ error: 'Username or email already exists...' });
    } else if (!validateUsername(username)) {
      return res.status(400).json({ error: 'Invalid username. It should contain one capital letter and other numbers.' });
    } else if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Invalid password. It should contain at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
      });
    } else if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: "Please enter valid phone number" })
    }
    next();
  }

  function validateLogin(req,res,next){
    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).json({ Error: "Usernme and password are required" })
   }
   next();
  }

  // function validateUpdateUser(req,res,next){
  //   if (!validateUsername(username)) {
  //     return res.status(400).json({ error: 'Invalid username. It should contain one capital letter and other numbers.' });
  //   } else if (!validatePassword(password)) {
  //     return res.status(400).json({
  //       error: 'Invalid password. It should contain at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
  //     });
  //   }
  //   next();
  // }
 
module.exports = { validateUsername, validatePassword, isEmpty, validatePhoneNumber,validateAddUser, validateLogin};
