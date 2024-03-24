import React from 'react';
import HighlightText from '../Homepage/HighlightText';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function Quote() {
  return (
    <div className=' text-center text-4xl text-richblack-100 font-bold' >
        <span className=' relative' >
          <FaQuoteLeft className=' absolute -top-3 -left-7 inline text-richblack-700 text-2xl ' />
        </span>
        <div className='inline' >
          We are passionate about revolutionizing the way we learn.<br/> Our innovative platform 
          <HighlightText text={"combines technology"} />,
          <span className=' text-yellow-200 '>
              {" "}
              expertise
          </span> 
          ,  and community to create an
          <span className=' text-yellow-200 '>
              {" "}
              unparalleled educational experience.
          </span>
        </div>
        <span className=' relative'>
          <FaQuoteRight className=' absolute -top-1 -right-6 inline text-richblack-700 text-2xl ' />
        </span>
    </div>
  )
}

export default Quote