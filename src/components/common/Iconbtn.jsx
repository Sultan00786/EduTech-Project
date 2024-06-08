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
<<<<<<< HEAD
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : " bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    >
      {children ? (
        <div className={customClasses}>
=======
    <button disabled={disabled} type={type} onClick={onClick}>
      {children ? (
        <div className="flex flex-row gap-2 items-center">
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
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
