const express=require('express');
const router=express.Router();
const {getcontacts,createContact,getContact,UpdateContact,DeleteContact}=require("../controllers/contactController");


router.route("/").get(getcontacts).post(createContact);



router.route("/:id").get(getContact).put(UpdateContact).delete(DeleteContact);


module.exports=router;
