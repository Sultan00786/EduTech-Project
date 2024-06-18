import React, { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/api";
import toast from "react-hot-toast";

const { REVIEWS_DETAILS_API } = ratingsEndpoints;

function ReviewSlider() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getAllReviews() {
        
      try {
        const result = await apiConnector("GET", REVIEWS_DETAILS_API);
        console.log(result);
      } catch (error) {
        throw error.message;
      }
    }
    const toastId = toast.loading("Loading...");
    getAllReviews();
    toast.dismiss(toastId);
  }, []);

  return <div>ReviewSlider</div>;
}

export default ReviewSlider;
