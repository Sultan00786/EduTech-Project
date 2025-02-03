import React from "react";

function Iconbtn({
   text,
   onClick,
   children,
   disabled,
   outline = false,
   customClasses,
   type,
}) {
   return (
      <button
         disabled={disabled}
         type={type}
         onClick={onClick}
         className={`flex items-center ${
            outline
               ? "border border-richblack-300 bg-transparent text-white"
               : " bg-yellow-50"
         } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      >
         {children ? (
            <div className={customClasses}>
               <span>{text}</span>
               {children}
            </div>
         ) : (
            <span>{text}</span>
         )}
      </button>
   );
}

export default Iconbtn;
