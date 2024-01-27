const express=require('express');
const errorHandler = require('./middleware/errorhandler');
const dotenv=require('dotenv').config();
const connectDB=require('./config/dbConnection');

connectDB();
const app=express();

const port=process.env.PORT || 3000;

app.use(express.json());// to read the json message come with the request
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server started on port`);
});