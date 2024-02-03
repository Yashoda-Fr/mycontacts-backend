
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@decs all contact
//route GET /api/contacts
//access Public

const getcontacts = asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user._id});
    res.status(200).json(contacts);
});

//@decs create new contact
//route POST /api/contacts
//access Public

const createContact =asyncHandler(async(req,res)=>{
    console.log("The request body is ",req.body);
    const {name,email,phone,type}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user._id,
        
    });
    res.status(201).json(contact);
})


//@decs Get new contact
//route GET /api/contacts/:id
//access Public

const getContact =asyncHandler(async(req,res)=>{
    const contact = await  Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    res.status(200).json(contact);
});

//@decs Update new contact
//route PUT /api/contacts/:id
//access Public

const UpdateContact =asyncHandler(async(req,res)=>{
   const contact = await  Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");

    }

    if(contact.user_id.toString()!==req.user._id){
        res.status(403);
        throw new Error("User don't have permission to update othe users contacts !");

    }
    const updatecontact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,

        })
    res.status(200).json(updatecontact);
})

//@decs DELETE contact
//route DELETE /api/contacts/:id
//access Public

const DeleteContact =asyncHandler(async(req,res)=>{
    const contact = await  Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found !");

    }

    
    if(contact.user_id.toString()!==req.user._id){
        res.status(403);
        throw new Error("User don't have permission to update othe users contacts !");

    }


    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
})




module.exports={getcontacts,createContact,getContact,UpdateContact,DeleteContact};
