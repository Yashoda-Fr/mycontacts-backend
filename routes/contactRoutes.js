const express=require('express');
const router=express.Router();
const {getcontacts,createContact,getContact,UpdateContact,DeleteContact}=require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)
router.route("/").get(getcontacts).post(createContact);
router.route("/:id").get(getContact).put(UpdateContact).delete(DeleteContact);


module.exports=router;
