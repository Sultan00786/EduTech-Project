import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
   const { total, totalItems } = useSelector((state) => state.cart);
   return (
      <div className=" text-white w-11/12 mx-auto md:w-full">
         <h1 className=" text-richblack-5 font-bold text-4xl mt-7 mb-7">
            Your Cart
         </h1>
         <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
            {totalItems} Courses in Cart
         </p>

         {total > 0 ? (
            <div className=" md:w-full  mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
               <RenderCartCourses />
               <RenderTotalAmount />
            </div>
         ) : (
            <p className="mt-14 text-center text-3xl text-richblack-100">
               Your Cart is Empty!!
            </p>
         )}
      </div>
   );
}

export default Cart;
