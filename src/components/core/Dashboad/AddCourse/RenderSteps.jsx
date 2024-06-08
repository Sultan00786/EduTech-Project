import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
<<<<<<< HEAD
import PublishCourse from "./PublishCourse";
=======
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7

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
<<<<<<< HEAD
    title: "Publish Course",
=======
    title: "Publish",
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
  },
];

function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  return (
<<<<<<< HEAD
    <div className=" flex flex-col gap-10">
      <div className=" bg-richblack-800 py-3 rounded-lg">
        <div className="w-full flex items-center justify-evenly">
          {steps.map((item) => (
            <div className="flex flex-col items-center gap-2">
              <div
                className={` w-[45px] h-[45px] flex items-center justify-center   text-xl font-bold border-[2px] p-2 rounded-full text-center ${
=======
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
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
                  step >= item.id // idhar problem aa skta hie styling mai
                    ? " bg-yellow-900 border-yellow-50 text-yellow-50"
                    : " bg-richblack-800 text-richblack-300 border-richblack-700"
                }`}
              >
<<<<<<< HEAD
                <div>{step > item.id ? <FaCheck /> : item.id}</div>
              </div>
              <p
                className={` w-[55px] text-center text-xs ${
                  step >= item.id ? " text-richblack-5" : " text-richblack-300"
                } `}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="  rounded-md border-richblack-700 bg-richblack-800 p-6 ">
        <div className="flex items-center">
          {steps.map((item) => (
            <>
              <div
                className={` ${
                  item.id !== step ? " hidden " : ""
                } text-2xl text-richblue-5 font-bold mb-5 mt-8 `}
              >
                <p>{item.title}</p>
              </div>
            </>
          ))}
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
=======
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
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
  );
}

export default RenderSteps;
