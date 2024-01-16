const { body } = require("express-validator");

const customerAddValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name is mandatory")
      .isLength({ min: 3 })
      .withMessage("Name needs minimum 3 characters"),
    body("email")
      .isString()
      .withMessage("The email is mandatory")
      .isEmail()
      .withMessage("Enter a valid email"),
    body("phone")
      .isString()
      .withMessage("The phone is mandatory")
      .isLength({ min: 10 })
      .withMessage("Phone needs minimum 10 numbers"),
    body("address")
      .isString()
      .withMessage("The address is mandatory")
      .isLength({ min: 10 })
      .withMessage("Address needs minimum 10 caracteres"),
  ];
};

const customerUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name needs minimum 3 characters"),
    body("email").optional().isEmail().withMessage("Enter a valid email"),
    body("phone")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Phone needs minimum 10 numbers"),
    body("address")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Address needs minimum 10 caracteres"),
  ];
};

module.exports = {
  customerAddValidation,
  customerUpdateValidation,
};
