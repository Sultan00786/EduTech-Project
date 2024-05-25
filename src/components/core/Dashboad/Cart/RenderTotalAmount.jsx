import React from "react";
import { useSelector } from "react-redux";
import Iconbtn from "../../../common/Iconbtn";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  function handleByCourse() {
    const courses = cart.map((course)=>course._id);
    console.log("Bought these course:", courses);
    // TODO: Payment Api itegrate is remaining 
  }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <Iconbtn
        text="Buy Now"
        onClick={handleByCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
}

export default RenderTotalAmount;
