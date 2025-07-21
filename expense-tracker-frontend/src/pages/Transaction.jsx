import React , {useState , useEffect} from 'react'
import TransactionList from '../components/TransactionList';

const Transaction = () => {

  const [userId , setUserId] = useState("");
  
    useEffect(() => {
        try {
          
          const token = localStorage.getItem("token");
          if(token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.userId);
          }
  
        } catch (error) {
          console.log("Error in fetching userId from Token" , error);
        }
    } , []);


  return (
    <>
        <div className="p-6">
            <h1 className="text-3xl mb-6 font-bold text-blue-800">Manage Transaction</h1>
                {userId ? <TransactionList userId={userId} /> : <p>Loading Transaction...</p>}
        </div>
    </>
  )
}

export default Transaction
