const express = require("express");
const router = express.Router();

const {
    newTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionController");


// POST /api/transaction
router.post("/", newTransaction);


// GET /api/transaction?userId=xxx
router.get("/", getTransaction);


// PUT /api/transaction/:id
router.put("/:id", updateTransaction);


// DELETE /api/transaction/:id
router.delete("/:id", deleteTransaction);


module.exports = router;
