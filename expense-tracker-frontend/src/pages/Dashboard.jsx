import React, { useState , useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from "axios";
import DashboardTop from '../components/DashboardTop';
import ExpensePieChart from '../components/ExpensePieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import YearlyLineChart from '../components/YearlyLineChart';
import useCurrentDate from '../CustomHooks/useCurrentDate';


const BASE_URL = "http://localhost:3000"

const Dashboard = () => {

  const {lastdateOfMonth , month: currentMonth , year: currentYear} = useCurrentDate();
  const [userId , setUserId] = useState("");
  const [monthlytransactions , setMonthlyTransactions] = useState([]);
  const [yearlyTransactions , setYearlyTransactions] = useState([]);
  const [income , setIncome] = useState(0);    // current month income
  const [expense , setExpense] = useState(0);   // current month expense


  useEffect(() => {
      const token = localStorage.getItem("token");

      if(token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.userId);
          } catch (err) {
            console.error("Invalid token");
          }
      }
  } , [])


  useEffect(() => {
    if(userId) {
        fetchMonthlyTransactions();
        fetchYearlyTransactions();
    }
  } , [userId, currentMonth, currentYear, lastdateOfMonth]);

  
  useEffect(() => {
    if (monthlytransactions.length > 0) {
      calculateSummary(monthlytransactions);
    }
    else {
      console.log("No monthly transactions");
    }
  }, [monthlytransactions]);


  const fetchMonthlyTransactions = async() => {
      const params = new URLSearchParams;

      const month = currentMonth;
      const year = currentYear;
      const lastDay = lastdateOfMonth;

      const startDate = `${year}-${month}-01`;
      const endDate = `${year}-${month}-${lastDay}`;

      params.append("userId" , userId);
      params.append("startDate" , startDate);
      params.append("endDate" , endDate);

      try {
        const response = await axios.get(`${BASE_URL}/api/transaction?${params.toString()}`);
        setMonthlyTransactions(response.data.paginatedTransactions);
        console.log(response.data.paginatedTransactions)
      } catch (error) {
        console.log("Error in fetching the transactions" , error);
      }
  }


  const calculateSummary = (data) => {
    let totalIncome = 0;
    let totalExpense = 0;

    data.forEach((txn) => {
      if(txn.categoryType === "income") {
        totalIncome += txn.amount;
      }
      else {
        totalExpense += txn.amount;
      }
    })

    setIncome(totalIncome);
    setExpense(totalExpense);
  }



  const fetchYearlyTransactions = async() => {
      const params = new URLSearchParams;

      const year = currentYear;
      
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;

      params.append("userId" , userId);
      params.append("startDate" , startDate);
      params.append("endDate" , endDate);

      try {
        const response = await axios.get(`${BASE_URL}/api/transaction?${params.toString()}`);
        setYearlyTransactions(response.data.paginatedTransactions);
        console.log(response.data.paginatedTransactions)
      } catch (error) {
        console.log("Error in fetching the transactions" , error);
      }
  }
  

  return (
    <>
        <div className="mb-6">
            <DashboardTop income={income} expense={expense} />  
        </div> 

        <div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 ">
                    <ExpensePieChart transaction={monthlytransactions} />
                </div>
                <div className="w-full md:w-1/2">
                    <MonthlyBarChart transaction={monthlytransactions} />
                </div> 
            </div> 

            <div className="w-full ">
                <YearlyLineChart transaction={yearlyTransactions} />  
            </div> 
        </div>       
    </>
  )
}

export default Dashboard
