const Transaction = require("../models/Transaction");


// new transaction
const newTransaction = async(req , res) => {
    try {
        
        const {amount , note , date , categoryId , categoryType , userId} = req.body;

        if (
            amount === undefined ||
            amount === null ||
            categoryId === undefined ||
            categoryType === null ||
            date === undefined ||
            userId === undefined
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = new Transaction({amount , note , date , categoryId , categoryType , userId});
        await transaction.save();

        return res.status(201).json(transaction);

    } catch (error) {
        res.status(500).json({ message: "Server error in newTransaction"});
    }
}



// get all transactions
const getTransaction = async(req , res) => {
    try {
        
        const { userId , startDate , endDate , type , search } = req.query;
        const page = req.query.page ? parseInt(req.query.page) : null;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const skip = page && limit ? (page - 1) * limit : 0;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        let filter = {userId};

        if(startDate && endDate) {
            filter.date = {
                $gte : new Date(startDate),
                $lte : new Date(endDate)
            }
        }

        //  Step 1: Fetch all filtered transactions (without skip/limit yet)
        let allTransactions = await Transaction.find(filter)
        .populate("categoryId" , "name type")
        .sort({date: -1})    //recent first

        if(type) {
            allTransactions = allTransactions.filter((txn) => txn.categoryType === type)
        }

        if(search) {
            const regex = new RegExp(search , "i");
            allTransactions = allTransactions.filter(txn => regex.test(txn.categoryId?.name))
        }

        //  Step 2: Count after all filters
        const totalTxn = allTransactions.length;

        //  Step 3: Apply pagination only if page and limit are provided
        let paginatedTransactions = allTransactions;
        if(page && limit) {
            paginatedTransactions = allTransactions.slice(skip , skip + limit);
        }

        return res.status(201).json({
            paginatedTransactions,
            totalTxn,
            ...(page && limit && {
                totalPage: Math.ceil(totalTxn / limit),
                currentPage : page
            })
        });

    } catch (error) {
        res.status(500).json({ message: "Server error in getTransaction"});
    }
}



// update transaction
const updateTransaction = async(req , res) => {
    try {
        
        const { id } = req.query;
        const { amount, note, date, categoryId, categoryType } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        const updated = await Transaction.findByIdAndUpdate(
            id,
            {amount, note, date, categoryId, categoryType},
            {new : true}
        );

        if(!updated) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.statue(201).json(updated);

    } catch (error) {
        res.status(500).json({ message: "Server error in updateTransaction"});
    }
}



// delete transaction
const deleteTransaction = async(req , res) => {
    try {
        
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        const deleted = await Transaction.findByIdAndDelete(id);

        if(!deleted) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(201).json(deleted);

    } catch (error) {
        res.status(500).json({ message: "Server error in deleteTransaction"});
    }
}



module.exports = {
    newTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
}