import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilder from "./CourseBuilder/CourseBuilder";

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
];

function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  return (
    <>
      <div className="flex flex-row">
        {steps.map((item) => (
          <>
            <div>
              {item.id !== 1 && (
                <span
                  className={` w-[30px] border-t-[1px] 
                            ${
                              item.id <= step
                                ? " border-yellow-50"
                                : " border-richblack-700 "
                            } `}
                ></span>
              )}
              <div
                className={`${
                  step >= item.id // idhar problem aa skta hie styling mai
                    ? " bg-yellow-900 border-yellow-50 text-yellow-50"
                    : " bg-richblack-800 text-richblack-300 border-richblack-700"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex items-center">
        {steps.map((item) => (
          <>
            <div>
              <p>{item.title}</p>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilder />}
    </>
  );
}

export default RenderSteps;
