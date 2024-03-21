const express = require("express");
const router = express.Router();
const {getContact, addContact, updateContact, deleteContact, getContactById} = require("../controller/ContactController");
const validate = require("../middleware/validateTokenHandeler")

router.route("/").get(validate,getContact).post(validate,addContact);
router.route("/:id").get(validate,getContactById).put(validate,updateContact).delete(validate,deleteContact);

module. exports = router;