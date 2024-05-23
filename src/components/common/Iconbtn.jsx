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
    <button disabled={disabled} type={type} onClick={onClick}>
      {children ? (
        <div className="flex flex-row gap-2 items-center">
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
