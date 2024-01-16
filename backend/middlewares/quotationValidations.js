const { body } = require("express-validator");

const quotationAddValidation = () => {
  return [
    body("customerId").isMongoId().withMessage("Customer invalid"),
    body("userId").isMongoId().withMessage("User invalid"),
    body("status").isString().withMessage("The Status is mandatory"),
    body("quoteGiven").isNumeric().withMessage("Enter a valid Quote Given").isLength({ min: 3 }).withMessage("Quote Given value needs minimum 03 digites"),
    body("date").isDate().withMessage("Enter a valid Date (YYYY-MM-DD)"),
    body("followUp").isDate().withMessage("Enter a Follow Up valid Date (YYYY-MM-DD)"),
    body("quoteDetails").isString().withMessage("The Quote Detail is mandatory"),
  ];
};

const quotationUpdateValidation = () => {
  return [
    body("customerId").optional().isObject().withMessage("Customer invalid"),
    body("userId").optional().isObject().withMessage("User invalid"),
    body("status").optional().isString().withMessage("The Status is mandatory"),
    body("quoteGiven").optional().isNumeric().withMessage("Enter a valid Quote Given").isLength({ min: 3 }).withMessage("Quote Given value needs minimum 03 number"),
    body("date").optional().isDate().withMessage("Enter a valid Date (YYYY-MM-DD)"),
    body("followUp").optional().isDate().withMessage("Enter a Follow Up valid Date (YYYY-MM-DD)"),
    body("quoteDetails").optional().isString().withMessage("The Quote Detail is mandatory"),
  ];
};

module.exports = {
  quotationAddValidation,
  quotationUpdateValidation,
};
