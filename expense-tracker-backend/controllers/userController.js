const User = require("../models/User");
const Category = require("../models/Category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const registerUser = async (req , res) => {
    
    try {
        const {name , email , password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(401).json({ msg: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User({name , email , password : hashedPassword});
        await newUser.save();

        const defaultCategories = [
        // Income Categories
        { name: "Salary / Compensation", type: "income", userId: newUser._id },
        { name: "Business Income", type: "income", userId: newUser._id },
        { name: "Consulting / Freelance", type: "income", userId: newUser._id },
        { name: "Investments Returns", type: "income", userId: newUser._id },
        { name: "Gifts", type: "income", userId: newUser._id },
        { name: "Other Income", type: "income", userId: newUser._id },

        // Expense Categories
        { name: "Meals & Dining", type: "expense", userId: newUser._id },
        { name: "Transportation", type: "expense", userId: newUser._id },
        { name: "Housing / Rent", type: "expense", userId: newUser._id },
        { name: "Utilities (Electricity, Water)", type: "expense", userId: newUser._id },  
        { name: "Groceries & Essentials", type: "expense", userId: newUser._id },
        { name: "Healthcare & Insurance", type: "expense", userId: newUser._id },      
        { name: "Entertainment (Subscriptions)", type: "expense", userId: newUser._id },
        { name: "Shopping", type: "expense", userId: newUser._id },
        { name: "Education", type: "expense", userId: newUser._id },
        { name: "EMI / Loans", type: "expense", userId: newUser._id },
        { name: "Miscellaneous", type: "expense", userId: newUser._id }
        ];

        await Category.insertMany(defaultCategories);

        return res.status(200).json({
            success : true,
            msg : "User registered successfully",
            userId : newUser._id
        });
    } catch (error) {
        console.log("Error in register " , error);
        return res.status(500).json({msg : "Server error", error})
    }

};



const loginUser = async(req , res) => {
    
    try {
        const {email , password} = req.body;


        if(!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await User.findOne({email});


        if(!existingUser) {
            return res.status(401).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password , existingUser.password);
        if(!isMatch) {
            return res.status(402).json({ msg: "incorrect password" });
        }

        const token = jwt.sign(
            {userId : existingUser._id,
             email : existingUser.email},
             process.env.JWT_SECRET,
            {expiresIn : "7d"}
        );

        return res.status(200).json({
            success : true,
            msg : "Login Successfully",
            token,
            userData: {
                name : existingUser.name,
                email : existingUser.email,
                mobile : existingUser.mobile
            }
        });

    } catch (error) {
        return res.status(500).json({ msg: "Server error", error });
    }

}




const updateUser = async(req , res) => {
    try {
        
        const {id} = req.params;
        const updateData = req.body;

        if(!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ msg: "No data to update." });
        }

        // ✅ Mobile number validation (add this)
        if (updateData.mobile && !/^\d{10}$/.test(updateData.mobile)) {
            return res.status(400).json({ msg: "Invalid mobile number format" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {new: true},
        )

        if(!updatedUser) {
            return res.status(401).json({msg : "User not found"})
        }



        return res.status(200).json({
            success : true,
            msg : "Updated Successfully",
            userData: {
                name : updatedUser.name,
                email : updatedUser.email,
                mobile : updatedUser.mobile
            }
        });

    } catch (error) {
        return res.status(500).json({msg : "Server Error from updateUser"});
    }
}




module.exports = {
    registerUser,
    loginUser,
    updateUser
}