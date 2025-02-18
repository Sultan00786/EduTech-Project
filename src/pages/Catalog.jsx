import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/api";
import toast from "react-hot-toast";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const { CATEGORIES_API } = categories;

const Catalog = () => {
   const { catalogName } = useParams();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [categoryDetails, setCategoryDetails] = useState();

   useEffect(() => {
      async function getCategoryId() {
         setLoading(true);
         const allCategorys = await apiConnector("GET", CATEGORIES_API, null);

         if (!allCategorys) {
            toast.error("Error in fetching all Categories");
            setLoading(false);
            return;
         }

         const currentCategory = allCategorys?.data?.allCategorys.filter(
            (category) =>
               category.name.split(" ").join("-").toLowerCase() === catalogName
         );

         const response = await getCatalogPageData({
            categoryId: currentCategory[0]._id,
         });

         console.log("Response >> ", response);

         if (response.length !== 0) setCategoryDetails(response);
         else {
            navigate("/");
            toast.error("No Course available !!");
         }
         // console.log("Details >> ", categoryDetails);
         setLoading(false);
      }

      getCategoryId();
   }, [catalogName]);

   if (loading) {
      return (
         <div className=" h-screen flex items-center justify-center">
            <div className=" loader"></div>
         </div>
      );
   }

   return (
      <div className=" text-white w-full mx-auto ">
         <div className=" w-full py-14 bg-richblack-800">
            <div className=" w-11/12 mx-auto">
               <div className=" w-11/12 mx-auto flex flex-col gap-3">
                  <div>
                     <span className=" text-sm text-richblack-100 w-fit">
                        Home / Catalog /{" "}
                     </span>
                     <span className=" text-sm text-yellow-50">
                        {categoryDetails?.selectedCetogry?.name}
                     </span>
                  </div>
                  <p className=" text-richblack-25 font-bold text-2xl">
                     {categoryDetails?.selectedCetogry?.name}
                  </p>
                  <p className=" text-richblack-200 text-sm">
                     {categoryDetails?.selectedCetogry?.description}
                  </p>
               </div>
            </div>
         </div>

         <div className=" w-11/12 mx-auto mb-16">
            <div className=" w-11/12 flex flex-col gap-5 mx-auto mt-16">
               <p className=" text-richblack-5 font-bold text-4xl">
                  {categoryDetails?.selectedCetogry?.name} Courses
               </p>

               <div>
                  <CourseSlider
                     courses={categoryDetails?.selectedCetogry?.courses}
                  />
               </div>
            </div>

            <div className=" w-11/12 flex flex-col gap-5 mx-auto mt-9">
               <p className=" text-richblack-5 font-bold text-4xl">
                  Other Courses
               </p>
               <div>
                  <CourseSlider
                     courses={categoryDetails?.differentCategory?.courses}
                  />
               </div>
            </div>

            <div className=" w-11/12 flex flex-col gap-5 mx-auto mt-16">
               <p className=" text-richblack-5 font-bold text-4xl">
                  Frequently Bought
               </p>

               <div>
                  <CourseSlider courses={categoryDetails?.mostSellingCourses} />
               </div>
            </div>

            {/* <div className=" w-11/12 flex flex-col gap-5 mx-auto mt-24 mb-16">
               <p className=" text-richblack-5 font-bold text-4xl">
                  Frequently Bought
               </p>
               <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 py-8">
                  {categoryDetails?.mostSellingCourses
                     .slice(0, 4)
                     .map((course, i) => (
                        <CourseCard
                           course={course}
                           key={i}
                           Height={"h-[400px]"}
                        />
                     ))}
               </div>
            </div> */}
         </div>

         <Footer></Footer>
      </div>
   );
};

export default Catalog;
