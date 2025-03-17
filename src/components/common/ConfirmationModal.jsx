import React from "react";
import Iconbtn from "./Iconbtn";

function ConfirmationModal({ modalData, onClose = () => {} }) {
   return (
      <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
         <div className=" p-5 bg-richblack-900 flex flex-col gap-2 w-[300px] rounded-xl border-[1px] border-richblack-500 ">
            <p className=" text-richblack-5 font-bold text-2xl">
               {modalData.text1}
            </p>
            <p className=" text-richblack-200 text-sm">{modalData.text2}</p>
            <div className="flex items-center gap-2 mt-2">
               <Iconbtn
                  onClick={() => {
                     modalData?.btn1Handler();
                     onClose();
                  }}
                  text={modalData?.btn1Text}
               />
               <button
                  className=" text-richblack-5 bg-richblack-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold "
                  onClick={modalData.btn2Handler}
               >
                  {modalData?.btn2Text}
               </button>
            </div>
         </div>
      </div>
   );
}

export default ConfirmationModal;
