import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import { IoPeople } from "react-icons/io5";
import { ImTree } from "react-icons/im";
import LowResponsiveExploreMore from "./LowResponsiveExploreMore";
import ExploreMoreCard from "./ExploreMoreCard";

const tabsName = [
   "Free",
   "New to coding",
   "Most popular",
   "Skills paths",
   "Career paths",
];

const ExploreMore = () => {
   // initial value of
   // tab    -> free,
   // course -> course of free tab,
   // card   -> card of particular course
   const [currentTab, setCurrentTab] = useState(tabsName[0]);
   const [courses, setCourses] = useState(HomePageExplore[0].courses);
   const [currentCard, setCurrentCard] = useState(
      HomePageExplore[0].courses[0].heading
   );

   const setMyCards = (element) => {
      console.log(element);
      setCurrentTab(element);

      // filler out HomePageExplore array using element(tabName)
      const tabResult = HomePageExplore.filter((tabs) => tabs.tag === element);

      setCourses(tabResult[0].courses);
   };

   return (
      <div>
         <div className=" hidden md:block w-[1260px] absolute -top-[350px] -left-[4%] ">
            <div className=" text-4xl font-semibold text-center ">
               Unlock the
               <HighlightText text={"Power of Code"} />
            </div>

            <p className=" text-center text-richblack-300 text-[18px] mt-1 ">
               Learn to build anything you can imagine
            </p>

            {/* Tab Commponent */}

            <div className="relative">
               <div className=" w-fit flex flex-row mx-auto mt-7 mb-5 px-1 py-1 gap-3 rounded-full border-richblack-700 border-b-[2px] bg-richblack-800 ">
                  {tabsName.map((element, index) => {
                     return (
                        <div
                           className={`text-[16px] flex flex-row items-center 
                      ${
                         currentTab === element
                            ? " bg-richblack-900 text-richblack-5 font-medium "
                            : " text-richblack-200 "
                      } 
                      rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 px-7 py-2 `}
                           key={index}
                           onClick={() => setMyCards(element)}
                        >
                           {element}
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Card Commponent */}

            {/* <CourseCard/> Commponent bane ka hie */}

            <div className=" w-[100%] flex flex-row mt-14 justify-between ">
               {courses.map((Course, index) => (
                  <ExploreMoreCard Course={Course} index={index} />
               ))}
            </div>
         </div>

         <div className=" md:hidden md:mt-0 -mt-[350px] ">
            <LowResponsiveExploreMore
               currentTab={currentTab}
               setCurrentTab={setCurrentTab}
               setMyCards={setMyCards}
               tabsName={tabsName.slice(0, 3)}
               courses={courses}
            />
         </div>
      </div>
   );
};

export default ExploreMore;
