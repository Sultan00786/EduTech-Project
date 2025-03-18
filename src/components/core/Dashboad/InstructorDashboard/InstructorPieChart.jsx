import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function InstructorPieChart({ instructorData }) {
   const [selectedData, setSelectedData] = useState("students"); // students or income

   const width = window.innerWidth;

   if (!instructorData || !instructorData?.length) {
      return (
         <div className="flex flex-col items-center justify-center h-full">
            <p className="text-richblack-100 text-lg font-medium">
               No Data Available
            </p>
            <p className="text-richblack-400 text-sm mt-1">
               Your course analytics will appear here
            </p>
         </div>
      );
   }

   // Calculate totals
   const totalStudents = instructorData.reduce(
      (acc, curr) => acc + curr.totalStudentsEnrolled,
      0
   );
   const totalIncome = instructorData.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
   );

   // Color schemes - Updated with better contrasting colors
   const studentColors = [
      "#1FA2FF", // Bright Blue
      "#FF6B6B", // Coral Red
      "#4ECB71", // Fresh Green
      "#FFB86C", // Warm Orange
      "#845EF7", // Royal Purple
      "#22D3EE", // Cyan
   ];

   const incomeColors = [
      "#00C49F", // Teal
      "#FF8042", // Sunset Orange
      "#FFCD56", // Warm Yellow
      "#845EF7", // Royal Purple
      "#22D3EE", // Cyan
      "#FF6B6B", // Coral Red
   ];

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend:
            width < 450
               ? { display: false }
               : {
                    position: "right",
                    align: "center",
                    labels: {
                       color: "#F59E0B", // Lighter color for better visibility
                       font: {
                          size: 15,
                          family: "'Inter', sans-serif",
                          weight: "500",
                       },
                       padding: 15,
                       usePointStyle: true,
                       boxWidth: 8,
                       boxHeight: 8,
                    },
                 },
         tooltip: {
            backgroundColor: "rgba(17, 24, 39, 0.95)", // Darker background with opacity
            titleColor: "#FFFFFF",
            titleFont: {
               size: 13,
               family: "'Inter', sans-serif",
               weight: "600",
            },
            bodyColor: "#FFFFFF",
            bodyFont: {
               size: 12,
               family: "'Inter', sans-serif",
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            callbacks: {
               label: (context) => {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return selectedData === "students"
                     ? `Students: ${value} (${percentage}%)`
                     : `Revenue: ₹${value} (${percentage}%)`;
               },
            },
         },
      },
      // Added hover effects
      onHover: (event, chartElement) => {
         event.native.target.style.cursor = chartElement[0]
            ? "pointer"
            : "default";
      },
   };

   const chartData = {
      labels: instructorData.map((course) => course.courseName),
      datasets: [
         {
            data: instructorData.map((course) =>
               selectedData === "students"
                  ? course.totalStudentsEnrolled
                  : course.totalAmountGenerated
            ),
            backgroundColor:
               selectedData === "students" ? studentColors : incomeColors,
            borderColor: "#161D29", // Darker border for better segment separation
            borderWidth: 2,
            hoverBackgroundColor:
               selectedData === "students"
                  ? studentColors.map((color) => color + "E6") // Less transparency
                  : incomeColors.map((color) => color + "E6"),
            hoverBorderColor: "#FFFFFF",
            hoverBorderWidth: 2,
            hoverOffset: 4, // Added offset on hover
         },
      ],
   };

   return (
      <div className="flex flex-col h-[400px]">
         <div className="flex md:flex-row flex-col items-center justify-between mb-6">
            <div className="flex flex-col gap-4">
               <p className="text-richblack-5 text-2xl font-bold">
                  Course Analytics
               </p>
               {/* Toggle Buttons */}
               <div className="flex gap-4 text-sm">
                  <button
                     onClick={() => setSelectedData("students")}
                     className={`px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedData === "students"
                           ? "bg-yellow-50 text-richblack-900 font-semibold"
                           : "bg-richblack-700 text-richblack-50 hover:bg-richblack-600"
                     }`}
                  >
                     Students
                  </button>
                  <button
                     onClick={() => setSelectedData("income")}
                     className={`px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedData === "income"
                           ? "bg-yellow-50 text-richblack-900 font-semibold"
                           : "bg-richblack-700 text-richblack-50 hover:bg-richblack-600"
                     }`}
                  >
                     Income
                  </button>
               </div>
            </div>
            <div className=" hidden md:flex gap-5">
               <div className="flex flex-col items-end">
                  <p className="text-richblack-300 text-sm">Total Students</p>
                  <p className="text-richblack-50 text-2xl font-bold">
                     {totalStudents}
                  </p>
               </div>
               <div className="flex flex-col items-end">
                  <p className="text-richblack-300 text-sm">Total Income</p>
                  <p className="text-richblack-50 text-2xl font-bold">
                     ₹{totalIncome}
                  </p>
               </div>
            </div>
         </div>
         <div className="relative h-full w-full">
            <Pie data={chartData} options={options} />
         </div>
      </div>
   );
}

export default InstructorPieChart;
