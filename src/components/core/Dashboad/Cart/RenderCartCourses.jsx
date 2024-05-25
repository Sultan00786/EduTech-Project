import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../slices/cartSlice";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <div>
            <img src={course?.thumbnail} />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaRegStar />}
                  filledIcon={<FaStar />}
                />

                <span>{course?.ratingAndReviews?.length}</span>
              </div>
            </div>

            <div>
                <button onClick={()=>dispatch(removeFromCart(course._id))}>
                    <RiDeleteBin6Line/>
                    <span>Remove</span>
                </button>
                <p>Rs {course?.price} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;
