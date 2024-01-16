const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name").isString().withMessage("The name is mandatory").isLength({ min: 3 }).withMessage("Minimum 3 characters"),
    body("email").isString().withMessage("The email is mandatory").isEmail().withMessage("Enter a valid email"),
    body("password").isString().withMessage("The password is mandatory").isLength({ min: 5 }).withMessage("Password needs Minimum 5 characters"),
    body("confirmPassword")
      .isString()
      .withMessage("The Confirm Password is mandatory")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("The passwords is not the same");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email").isString().withMessage("The email is mandatory").isEmail().withMessage("Enter a valid email"),
    //body("password").isString().withMessage("The password is mandatory"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name").optional().isLength({ min: 3 }).withMessage("Name need minimum 3 characters"),
    body("email").optional().isEmail().withMessage("Enter a valid email"),
    //body("password").optional().isLength({ min: 5 }).withMessage("Password needs Minimum 5 characters"),
  ];
};

module.exports = {
  userCreateValidation,
  userUpdateValidation,
  loginValidation,
};
