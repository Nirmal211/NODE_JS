const validator = require("validator");
const validateRegisterData = (req) => {
  const { firstName, lastName, Password, Email, PhoneNumber } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(Email)) {
    throw new Error("Email is not Valid");
  } else if (!validator.isStrongPassword(Password)) {
    throw new Error("Enter The Strong Password");
  }
};

module.exports = {
  validateRegisterData,
};
