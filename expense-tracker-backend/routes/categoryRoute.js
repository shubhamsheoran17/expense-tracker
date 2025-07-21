const express = require("express");
const router = express.Router();
const {newCategory , getCategory , updateCategory , deleteCategory} = require("../controllers/categoryController");


// POST /api/category
router.post("/" , newCategory);

// GET /api/category?userId=xxx
router.get("/" , getCategory);

// PUT /api/category/:id
router.put("/:id" , updateCategory);

// DELETE /api/category/:id
router.delete("/:id" , deleteCategory);


module.exports = router;