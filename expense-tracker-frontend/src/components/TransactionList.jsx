import React , {useState , useEffect} from 'react'
import axios from "axios";


const BASE_URL = "http://localhost:3000";

const TransactionList = ({userId}) => {

    const [formData , setFormData] = useState({
        amount: "",
        note: "",
        date: "",
        categoryId: "",
    });
    const [showForm , setShowForm] = useState(false);
    const [categoryList , setCategoryList] = useState([]);
    const [transactionList , setTransactionList] = useState([]);
    const [filters , setFilters] = useState({
        startDate: "",
        endDate: "",
        type: "",
        search: ""
    })
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(1);



    const fetchCategory = async() => {
        try {
            
            const response = await axios.get(`${BASE_URL}/api/category?userId=${userId}`);
            setCategoryList(response.data);            

        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    }



    const fetchTransactions = async(currentPage = 1) => {
        try {
            
            const params = new URLSearchParams();
            params.append("userId" , userId);
            params.append("page", currentPage);          // <-- Send current page
            params.append("limit", 8);            // <-- Set limit per page
            if(filters.startDate) params.append("startDate" , filters.startDate);
            if(filters.endDate) params.append("endDate" , filters.endDate);
            if(filters.type) params.append("type" , filters.type);
            if(filters.search) params.append("search" , filters.search);

            const response = await axios.get(`${BASE_URL}/api/transaction?${params.toString()}`);
 
            setTransactionList(response.data.paginatedTransactions);
            setTotalPage(response.data.totalPage);
            setPage(response.data.currentPage);          

        } catch (error) {
            console.log("Error fetching transaction:", error);
        }
    }



    useEffect(() => {
        if(userId) {
            fetchCategory();
            fetchTransactions(page);
        }
    } , [userId , page]);



    const handleOnSubmit = async(e) => {
        e.preventDefault();

        const {amount , note , date , categoryId} = formData;
        if(!amount || !note || !date || !categoryId) {
            alert("All Fields are required");
            return;
        }

        // ✅ Find the category from the list to get its type
        const selectedCategory = categoryList.find(cat => cat._id === categoryId);
        if (!selectedCategory) {
            alert("Invalid category selected");
            return;
        }

        const type = selectedCategory.type;

        try {
            
            const response = await axios.post(`${BASE_URL}/api/transaction` , {
                amount: formData.amount,
                note: formData.note,
                date: formData.date,
                categoryId: formData.categoryId,
                categoryType: type,
                userId
            })
            setFormData({ amount: "", categoryId: "", note: "", date: "" });
            setShowForm(false);
            fetchTransactions();

        } catch (error) {
            console.log("Error in saving the transaction" , error)   
        }
    }



    const handleFilter = async(e) => {
        e.preventDefault();
        setPage(1);  // reset page whenever apply the filters
        await fetchTransactions(page);
    }



    const handleOnRemove = async(idToRemove) => {
        try {
            await axios.delete(`${BASE_URL}/api/transaction/${idToRemove}`);
            await fetchTransactions();
        } catch (error) {
            console.log("Error in deleting the transaction" , error);
        }
    }


  return (
    <>
        <div className="flex flex-col justify-center my-5 gap-10">

            <form onSubmit={handleOnSubmit} className='flex flex-col sm:flex-wrap md:flex-row gap-3 items-center bg-white shadow-md p-4 rounded-lg mx-5 overflow-x-auto'>
                {!showForm && (
                    <>
                        <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            +Transaction
                        </button>
                    </>
                )}

                {showForm && (
                    <>
                        <input 
                        type="number"
                        placeholder='Amount...'
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData , amount : e.target.value})} 
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <select 
                        value={formData.categoryId}
                        onChange={(e) => setFormData({...formData , categoryId : e.target.value})}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select category</option>
                            {categoryList.map((cat) => (
                                <option value={cat._id} key={cat._id}>
                                    {cat.name} ({cat.type})
                                </option>
                            ))}
                        </select>

                        <input
                        type="text"
                        placeholder="Desc..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        />

                        <button 
                        type="submit" 
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition cursor-pointer" 
                        >
                            Save Transaction
                        </button>
                        </>
                    )}
            </form>


            {/* this div will have sorting algo like sort the transactions based on date/amount/category, and type like income/expense and a search bar to search by category */}
            <div className='w-full '>
                <form onSubmit={handleFilter} className='w-full flex flex-col sm:flex-wrap md:flex-row gap-5 items-center bg-white shadow-md p-4 rounded-lg mx-5 overflow-x-auto'>
                    <input 
                        type="date" 
                        value={filters.startDate} 
                        onChange={(e) => setFilters({...filters , startDate : e.target.value})}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input 
                    type="date" 
                        value={filters.endDate} 
                        onChange={(e) => setFilters({...filters, endDate: e.target.value})} 
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <select 
                        onChange={(e) => setFilters({...filters , type : e.target.value})} 
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                            <option value="">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search category..."
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition min-w-[150px]"
                    >
                        Apply Filters
                    </button>
                </form>
            </div>


            <div className="space-y-10">
                <div className='mx-4'>

                    <h1 className='font-semibold mb-4 text-xl text-green-700'>All Transactions</h1>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {transactionList.map((txn) => (
                            <div key={txn._id} className="flex flex-col justify-between w-full sm:w-[270px] h-[220px] bg-white shadow-xl p-4 rounded-xl border hover:shadow-2xl transition relative">
                                <div className="flex flex-col gap-2 text-gray-700">
                                    <p className="text-sm opacity-70">{txn.date?.slice(0, 10)}</p>
                                    <h2 className="text-lg font-semibold truncate">{txn.note}</h2>
                                    <p className="text-sm font-medium capitalize opacity-80 truncate">
                                        {txn.categoryId?.name || "N/A"} ({txn.categoryType})
                                    </p>
                                    <p className={`text-lg font-bold ${txn.categoryType === "income" ? "text-green-600" : "text-red-500"}`}>
                                            ₹{txn.amount}
                                    </p>
                                </div>
                                <div className='mt-6 self-end'>
                                    <button 
                                        className="bg-zinc-600 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm"
                                        onClick={() => handleOnRemove(txn._id)}>
                                            remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>


            <div className="flex gap-2 justify-center mt-4">
                
                <button
                    disabled = {page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                        Prev
                </button>

                <span className="px-2 py-1 bg-gray-200 rounded">
                        Page {page} of {totalPage}
                </span>
                <button
                    disabled = {page === totalPage}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>

        </div>
    </>
  )
}

export default TransactionList
