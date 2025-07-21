const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : [true , "amount is required"]
    },
    note : {
        type : String,
        trim : true
    },
    date : {
        type : Date,
        required : [true , "date is required"]
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    categoryType: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {timestamps : true});


module.exports = mongoose.model("Transaction" , transactionSchema);