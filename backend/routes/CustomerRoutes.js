const express = require("express");
const router = express.Router();

//controller
const { add, update, getAll } = require("../controllers/CustomerController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

const { customerAddValidation, customerUpdateValidation } = require("../middlewares/customerValidations");

//Routes
router.post("/add", authGuard, customerAddValidation(), validate, add);
router.get("/list", authGuard, getAll);
router.put("/update/:id", authGuard, customerUpdateValidation(), validate, update);

module.exports = router;
