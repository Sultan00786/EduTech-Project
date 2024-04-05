import React from 'react'

function Iconbtn({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) {
  return (
    <button
        disabled={disabled}
        type={type}
        onClick={onClick}
    >
        {
            children 
            ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) 
            : (
                <span>
                    {text}
                </span>
            )
        }
    </button>
  )
}

export default Iconbtn