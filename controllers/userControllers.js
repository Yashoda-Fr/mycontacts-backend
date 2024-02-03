const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//@decs Register new user
//route POST /api/user/register
//access Public

const registerUser = asyncHandler(async (req,res)=> {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists !");
    }
    //to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("The hashed password is ", hashedPassword);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,

    });
    console.log(`The user is ${user}`);
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });

    } else {
        res.status(400);
        throw new Error("Invalid user data !");
    }
    res.json({message: "user data is not valid"});

});

//@decs Login the user
//route POST /api/user/login
//access Public

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mendatory !");
    }
const user = await User.findOne({email});
    //to compare the password with hash password
    if (user && (await bcrypt.compare(/*entered password during the login attempt.*/password, /*hashed password stored in the user object retrieved from the database.*/user.password))) {
       const accesstoken =jwt.sign({
           user:{username: user.name,
               email: user.email,
               id: user._id,
           },
       },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"});
        res.status(200).json({accesstoken})

    }
    else {
        res.status(400);
        throw new Error("Email or password  is not valid !");
    }

});

//@decs current user information
//route GET /api/user/current
//access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json({message:"current user information"});
});

module.exports={registerUser,loginUser,currentUser};