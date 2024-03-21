const express = require("express")
const router = express.Router();
const {login,register,getUsers,profile} = require("../controller/UsersController");
const validate = require("../middleware/validateTokenHandeler");

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/profile").get(validate,profile)
router.route("/get").get(getUsers)

module.exports = router;