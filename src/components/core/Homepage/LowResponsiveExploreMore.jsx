import React from "react";
import HighlightText from "./HighlightText";
import { Tabs, Tab } from "@heroui/react";
import { HomePageExplore } from "../../../data/homepage-explore";
import ExploreMoreCard from "./ExploreMoreCard";
import { Swiper, SwiperSlide } from "swiper/react";

function LowResponsiveExploreMore({
   currentTab,
   setCurrentTab,
   tabsName,
   courses,
   setMyCards,
}) {
   return (
      <div>
         <div className=" text-4xl font-semibold ">
            Unlock the <br />
            <HighlightText text={"Power of Code"} />
         </div>

         <p className=" text-richblack-300 text-[18px] mt-1 ">
            Learn to build anything you can imagine
         </p>

         <div className="mt-8 relative">
            <Tabs
               aria-label="Options"
               classNames={{
                  tabList:
                     "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-[#22d3ee]",
                  tab: "max-w-fit px-0 h-12 pt-2",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
               }}
               color="primary"
               variant="underlined"
               onSelectionChange={(key) => setMyCards(tabsName[key])}
            >
               {tabsName.map((tab, index) => (
                  <Tab
                     key={index}
                     title={<div className="text-lg">{tab}</div>}
                     onClick={() => setMyCards(tab)}
                  ></Tab>
               ))}
            </Tabs>

            <div className="absolute top-[49px] right-0 h-full w-full">
               {courses?.length > 0 && (
                  <Swiper
                     slidesPerView={1}
                     spaceBetween={30}
                     className="mySwiper"
                  >
                     {courses?.map((course, index) => (
                        <SwiperSlide>
                           <ExploreMoreCard Course={course} index={index} />
                        </SwiperSlide>
                     ))}
                  </Swiper>
               )}
            </div>
         </div>
      </div>
   );
}

export default LowResponsiveExploreMore;
