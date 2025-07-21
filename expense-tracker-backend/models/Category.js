const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"],
        trim : true
    },
    type : {
        type : String,
        enum : ["income" , "expense"],
        required : [true , "Category Type is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {timestamps : true});

module.exports = mongoose.model("Category" , categorySchema);