import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PieChartLebels from "./PieChartLebels";

ChartJS.register(ArcElement, Tooltip, Legend);

function InstructorPieChart({ instructorData }) {
   console.log(instructorData);
   const [pieDataFor, setDataFor] = useState("student");

   const filterStudentData = instructorData?.filter(
      (course) => course?.totalStudentsEnrolled !== 0
   );
   const filterIncomeData = instructorData?.filter(
      (course) => course?.totalStudentsEnrolled !== 0
   );

   const datasetForStudent = {
      labels: filterStudentData?.map((course) => course?.courseName),
      datasets: [
         {
            label: "Students Enrolled",
            data: filterStudentData?.map(
               (course) => course?.totalStudentsEnrolled
            ),
            backgroundColor: randomColorGenerate(filterStudentData?.length),
            borderColor: "rgb(217, 218, 224)",
            hoverOffset: 30,
            borderWidth: 3,
            offset: 10,
         },
      ],
   };

   const datasetForIncome = {
      labels: filterIncomeData?.map((course) => course?.courseName),
      datasets: [
         {
            label: "Total Amount",
            data: filterIncomeData?.map(
               (course) => course?.totalAmountGenerated
            ),
            backgroundColor: randomColorGenerate(filterIncomeData?.length),
            borderColor: "rgb(217, 218, 224)",
            hoverOffset: 30,
            borderWidth: 3,
            offset: 16,
         },
      ],
   };

   const option = {
      responsive: false,
      plugins: {
         legend: { display: false },
         tooltip: { enabled: true },
      },
   };

   function randomColorGenerate(numLength) {
      let colors = [];
      for (let i = 0; i < numLength; i++) {
         const colorStr = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
         )}, ${Math.floor(Math.random() * 256)})`;
         colors.push(colorStr);
      }
      return colors;
   }

   return (
      <div>
         <p className=" text-richblack-5 text-xl font-bold mb-2">Visualize</p>
         <div className="flex gap-5 text-yellow-200 ">
            <button
               className={` px-2 py-1 rounded-2xl hover:text-yellow-50 ${
                  pieDataFor === "student" ? " bg-richblack-700" : ""
               } `}
               onClick={() => setDataFor("student")}
            >
               Students
            </button>
            <button
               className={` px-2 py-1 rounded-2xl hover:text-yellow-50 ${
                  pieDataFor !== "student" ? " bg-richblack-700" : ""
               } `}
               onClick={() => setDataFor("income")}
            >
               Income
            </button>
         </div>
         <div className=" relative flex items-center justify-between gap-4 px-14">
            <PieChartLebels
               data={
                  pieDataFor === "student"
                     ? datasetForStudent
                     : datasetForIncome
               }
            />
            <Pie
               data={
                  pieDataFor === "student"
                     ? datasetForStudent
                     : datasetForIncome
               }
               options={option}
               width={400}
               height={400}
            />
            {pieDataFor === "student" ? (
               <div className=" absolute top-[33%] left-[10%] w-10/12">
                  {filterStudentData?.length == 0 && (
                     <p className=" text-richblack-500 text-4xl font-bold text-center underline ">
                        No data available for students enrolled
                     </p>
                  )}
               </div>
            ) : (
               <div className=" absolute top-[33%] left-[10%] w-10/12">
                  {filterIncomeData?.length == 0 && (
                     <p className=" z-10 text-richblack-500 text-4xl font-bold text-center underline ">
                        No data available for total Income Revenue
                     </p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}

export default InstructorPieChart;
