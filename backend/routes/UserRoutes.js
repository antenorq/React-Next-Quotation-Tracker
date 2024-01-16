const express = require("express");
const router = express.Router();

//controller
const { register, login, getCurrentUser, update, getUserById, getAll } = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, userUpdateValidation, loginValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/update", authGuard, userUpdateValidation(), validate, update);
router.get("/list", authGuard, getAll);
router.get("/:id", getUserById);

module.exports = router;
