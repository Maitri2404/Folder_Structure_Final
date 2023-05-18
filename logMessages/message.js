const message = {
  userNotFound: 'User not found',
  registerUserSuccess: 'You are registered successfully',
  getUsers: 'Get users successfully',
  usernameUpdate: 'Username updated successfully',
  updatePassword: 'Password updated successfully',
  invalidPassword: 'Invalid Password',
  checkAddUser: 'All fields are required',
  checkUniqueUser: 'Username or email already exists',
  validUserNameV1: 'Invalid username. It should contain capital letter and other numbers',
  validPasswordV1: 'Invalid password. It should contain at least one capital letter, one small letter, one symbol, and length must be between 8 to 16 ',
  validPhoneNumber: 'Please enter valid phone number',
  usernameRequire: 'Username required',
  userNameAndPasswordRequire: 'Username and Password required',
  validUserNameV2: 'Invalid username. It should contain all small letter, and one symbol',
  validPasswordV2: 'Invalid password. It should contain at least one capital letter ,at least one symbol, and length must be between 8 to 16 ',
  unAuthorized: 'Unauthorized',
  jwt: 'jwt invalid',
  forbiddenAccess: 'Forbidden...You do not have permission to access',
};

const status = {
  success: 200,
  created: 201,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
};

module.exports = { message, status };
