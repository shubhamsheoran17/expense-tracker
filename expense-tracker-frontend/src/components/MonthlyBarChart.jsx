// components/MonthlyBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import useCurrentDate from "../CustomHooks/useCurrentDate";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyBarChart = ({ transaction }) => {

  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  let {lastdateOfMonth , month: currentMonth , year: currentYear} = useCurrentDate();
  currentMonth = monthNames[currentMonth-1];


  // Group expenses by date
  const dailyTotals = {};

  transaction.forEach((txn) => {
    const date = new Date(txn.date).getDate(); // Get day of month (1-31)
    if (txn.categoryType === "expense") {
      dailyTotals[date] = (dailyTotals[date] || 0) + txn.amount;
    }
  });

  // Create array for full month
  const labels = Array.from({ length: 31 }, (_, i) => i + 1); // Days 1–31
  const data = labels.map((day) => dailyTotals[day] || 0); // If no data, default to 0

  const chartData = {
    labels: labels.map((d) => `Day ${d}`),
    datasets: [
      {
        label: "Daily Expenses",
        data,
        backgroundColor: "#f87171", // red-400
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md h-full flex flex-col justify-between aspect-[4/3]">
      <h2 className="text-center text-xl font-bold text-gray-700">Daily Expense Trend ({currentMonth}, {currentYear})</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyBarChart;
