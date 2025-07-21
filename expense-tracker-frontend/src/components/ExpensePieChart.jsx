import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useCurrentDate from '../CustomHooks/useCurrentDate';



ChartJS.register(ArcElement, Tooltip, Legend);


const ExpensePieChart = ({ transaction }) => {
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let {lastdateOfMonth , month: currentMonth , year: currentYear} = useCurrentDate();
  currentMonth = monthNames[currentMonth-1];
  

  // Grouping by category name
  const categoryWiseExpenses = {};

  transaction.forEach((txn) => {
    if (txn.categoryType === "expense") {
      const catName = txn.categoryId.name;
      categoryWiseExpenses[catName] = (categoryWiseExpenses[catName] || 0) + txn.amount;
    }
  });

  const labels = Object.keys(categoryWiseExpenses);
  const values = Object.values(categoryWiseExpenses);

  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50",
    "#FF9800", "#9C27B0", "#00BCD4", "#E91E63",
    "#3F51B5", "#8BC34A", "#CDDC39", "#795548"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="bg-white p-5 rounded-xl shadow-md h-full flex flex-col justify-center items-center aspect-[4/3]">
      <h2 className="text-center text-xl font-bold text-gray-700 mb-4">
        Expenses by Category ({currentMonth}, {currentYear})
      </h2>
      {labels.length > 0 ? (
        <Pie data={data} />
      ) : (
        <p className="text-center text-gray-500">No expense data available</p>
      )}
    </div>
  );
};

export default ExpensePieChart;
