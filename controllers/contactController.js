


//@decs all contact
//route GET /api/contacts
//access Public

const getcontacts = (req,res)=>{
    res.status(200).json({message:"Get all  contacts"});
}

//@decs create new contact
//route POST /api/contacts
//access Public

const createContact =(req,res)=>{
    console.log("The request body is ",req.body);
    const {name,email,phone,type}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    res.status(201).json({message:"create a new contact"});
}


//@decs Get new contact
//route GET /api/contacts/:id
//access Public

const getContact =(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});
}

//@decs Update new contact
//route PUT /api/contacts/:id
//access Public

const UpdateContact =(req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`});
}

//@decs DELETE contact
//route DELETE /api/contacts/:id
//access Public

const DeleteContact =(req,res)=>{
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
}




module.exports={getcontacts,createContact,getContact,UpdateContact,DeleteContact};
