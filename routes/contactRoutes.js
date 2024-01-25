const express=require('express');
const router=express.Router();
const {getcontacts,createContact,getContact,UpdateContact,DeleteContact}=require("../controllers/contactController");


router.route("/").get(getcontacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(UpdateContact);


router.route("/:id").delete(DeleteContact);
module.exports=router;
