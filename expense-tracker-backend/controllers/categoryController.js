const Category = require("../models/Category");


// create a new category
const newCategory = async(req , res) => {
    try {
        
        const {name , type , userId} = req.body;

        if (!name || !type || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const category = new Category({name , type , userId});
        await category.save();

        return res.status(201).json(category);

    } catch (error) {
        return res.status(500).json({msg : "Server Error from newCategory"})
    }
}


// get all categories
const getCategory = async(req , res) => {
    try {
        
        const {userId} = req.query;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const categories = await Category.find({userId});
        return res.status(201).json(categories);

    } catch (error) {
        return res.status(500).json({msg : "Server Error from getCategory"})
    }
}



// updateCategory
const updateCategory = async(req , res) => {
    try {
        
        const {id} = req.params;
        const {name , type} = req.body;

        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name , type},
            {new : true}
        )

        if(!updateCategory) {
            return res.status(400).json({msg : "Category not found"})
        }

        return res.status(201).json(updateCategory);

    } catch (error) {
        return res.status(500).json({msg : "Server Error from updateCategory"});
    }
}



// delete category
const deleteCategory = async(req , res) => {
    try {
        
        const {id} = req.params
        console.log(id);

        const deleted = await Category.findByIdAndDelete(id)

        if(!deleted) {
            return res.status(400).json({msg : "Category not found"})
        }

        return res.status(201).json(deleted);

    } catch (error) {
        return res.status(500).json({msg : "Server Error from deleteCategory"});
    }


}


module.exports = {
    newCategory,
    getCategory,
    updateCategory,
    deleteCategory,
}