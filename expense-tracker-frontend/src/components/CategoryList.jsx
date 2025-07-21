import React , {useState , useEffect , useContext} from 'react'
import axios from 'axios';


const BASE_URL = "http://localhost:3000";


const CategoryList = ({userId}) => {

    const [incomeCategories , setIncomeCategories] = useState([]);
    const [expenseCategories , setExpenseCategories] = useState([]);
    const [showForm , setShowForm] = useState(false);
    const [formData , setFormData] = useState({
        name: "",
        type: "income",
    })


    const handleOnSubmit = async(e) => {
        e.preventDefault();

        const {name , type} = formData;
        if(!name || !type) {
            alert("All Fields are required");
            return;
        }

        try { 
            const response = await axios.post(`${BASE_URL}/api/category` , {
                name: formData.name,
                type: formData.type,
                userId: userId,
            });
            console.log(response.data);
            setFormData({name: "" , type: "income"});
            setShowForm(false);
            await fetchCategories();
        } catch (error) {
            console.log("Error in saving new category" , error);
        }
    }


    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev ,
            [e.target.name] : e.target.value
        }))
    }



    const handleOnRemove = async(idToRemove) => {
        try {
            await axios.delete(`${BASE_URL}/api/category/${idToRemove}`);
            fetchCategories();
        } catch (error) {
            console.log("Error in deleting the category" , error);
        }
    }



    
    const fetchCategories = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/category?userId=${userId}`);
            const allCategories = response.data || [];

            setIncomeCategories(allCategories.filter(cat => cat.type === "income"));
            setExpenseCategories(allCategories.filter(cat => cat.type === "expense"));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        if(userId) {
            fetchCategories();
        }
    } , [userId]);


  return (
    <>

        <div className="flex flex-col justify-center my-5 gap-10">

            <form onSubmit={handleOnSubmit} className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-md p-4 rounded-lg mx-5">
                {!showForm && (
                    <>
                        <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            +Category
                        </button>
                    </>
                )}
                {showForm && (
                    <>
                        <input 
                        type="text"
                        name="name"
                        placeholder='Category Name...'
                        value={formData.name}
                        onChange={handleOnChange}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <select 
                        name="type"
                        value={formData.type}
                        onChange={handleOnChange}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <button 
                        type="submit" 
                        className="bg-green-600 text-white px-10 py-2 rounded-md hover:bg-green-700 transition" 
                        >
                            Save Category
                        </button>
                    </>
                )}
            </form>

            <div className="space-y-10">
                <div className='mx-5'>
                    {/* Income categories */}
                    <h1 className='font-semibold mb-4 text-xl text-green-700'>Income Categories</h1>
                    <table className='w-full table-fixed border border-collapse bg-white shadow-sm rounded-md'>
                        <thead className="bg-green-200 text-center">
                            <tr>
                                <th className='p-3 border'>Name</th>
                                <th className='p-3 border'>Type</th>
                                <th className='p-3 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeCategories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-green-50">
                                    <td className='p-3 border pl-5'>{cat.name}</td>
                                    <td className='p-3 border pl-5 capitalize'>{cat.type}</td>
                                    <td className='p-3 border pl-5'>
                                        <button className="bg-rose-500 text-white px-3 py-1 rounded-md hover:bg-rose-600 transition cursor-pointer"
                                        onClick={() => handleOnRemove(cat._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='mx-5'>
                    {/* Expense categories */}
                    <h1 className='font-semibold mb-4 text-xl text-red-700'>Expense Categories</h1>
                    <table className='w-full table-fixed border border-collapse bg-white shadow-sm rounded-md'>
                        <thead  className="bg-red-200 text-center">
                            <tr>
                                <th className='p-3 border'>Name</th>
                                <th className='p-3 border'>Type</th>
                                <th className='p-3 border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseCategories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-red-50">
                                    <td className='p-3 border pl-5'>{cat.name}</td>
                                    <td className='p-3 border pl-5 capitalize'>{cat.type}</td>
                                    <td className='p-3 border pl-5'>
                                        <button className="bg-rose-500 text-white px-3 py-1 rounded-md hover:bg-rose-600 transition cursor-pointer"
                                        onClick={() => handleOnRemove(cat._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
      
    </>
  )
}

export default CategoryList
