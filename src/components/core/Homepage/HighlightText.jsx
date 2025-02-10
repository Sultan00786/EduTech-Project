import React from "react";

function HighlightText({ text }) {
   return (
      <span className=" font-bold bg-gradient-to-r from-blue-300 to-caribbeangreen-300 bg-clip-text text-transparent">
         {" "}
         {text}
      </span>
   );
}

export default HighlightText;
