const mongoose = require("mongoose");
const DB = process.env.MONGO

mongoose.connect(DB,{})
.then(()=>{
    console.log("connection Succesfull")
})
.catch((err)=>{
    console.log("Error" + err);
})