import React from "react";

function PieChartLebels({ data }) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        {data?.datasets[0]?.backgroundColor?.map((color, index) => (
          <div className=" flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2px border-richblack-900"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <span className=" text-richblack-200 font-semibold text-sm">
              {data?.labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChartLebels;
