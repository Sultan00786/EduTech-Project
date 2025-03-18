import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/Botton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import { useSelector } from "react-redux";
import codeBlockString from "../data/codeBlockString";

/**
 * Section 1
 * Section 2
 * Section 3
 * Foooter
 */

const Home = () => {
   const { loading } = useSelector((state) => state.auth);

   if (loading) {
      return (
         <div className=" h-[92vh] flex items-center justify-center">
            <div className="loader"></div>
         </div>
      );
   }

   return (
      <div>
         {/* Section 1 */}

         <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
            {/* Heading */}
            <div className=" text-center text-4xl font-semibold mt-16">
               Empower Your Future Growth with
               <HighlightText text={"Coding Skills"} />
            </div>

            {/* Paragraph */}
            <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 ">
               With our online coding courses, you can learn at your own pace,
               from anywhere in the world, and get access to a wealth of
               resources, including hands-on projects, quizzes, and personalized
               feedback from instructors.
            </div>

            {/* two button */}
            <div className="flex flex-row gap-7 ">
               {/* CTA --> call to action button */}

               <CTAButton active={true} linkto={"/signup"}>
                  Learn More
               </CTAButton>

               <CTAButton active={false} linkto={"/login"}>
                  Book a Demo
               </CTAButton>
            </div>

            {/* button */}
            <Link to={"/signup"}>
               <div className=" group mt-10 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 border-b-[2px] border-richblack-700 transition-all duration-200 hover:scale-95 w-full">
                  <div className="flex flex-row items-center gap-3 rounded-full px-6 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                     <p className=" text-richblack-200 text-[15px] font-semibold ">
                        Becomes an Instructor
                     </p>
                     <FaArrowRight className=" text-[12px] " />
                  </div>
               </div>
            </Link>

            {/* vedio */}
            <div className=" mx-3 my-12 shadow-blue-200">
               <video muted loop autoPlay>
                  <source src={Banner} type="video/mp4" />
               </video>
            </div>

            {/* Code Section 1 */}
            <div className="">
               <CodeBlocks
                  // bellow properties is atribute hie :-9
                  position={"md:flex-row"}
                  heading={
                     <div className=" text-4xl font-semibold">
                        Unlock Your
                        <HighlightText text={"Coding Potential"} />
                     </div>
                  }
                  subheading={
                     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. Whether you're a beginner or looking to advance your skills, our courses are crafted to deliver a rewarding learning experience"
                  }
                  ctabtn1={{
                     btnText: "try it yourself",
                     linkto: "/signup",
                     active: true,
                  }}
                  ctabtn2={{
                     btnText: "Learn more",
                     linkto: "/login",
                     active: false,
                  }}
                  codeblock={codeBlockString.html}
                  codeColor={"text-yellow-50"}
               />
            </div>

            {/* Code Section 2 */}
            <div>
               <CodeBlocks
                  // bellow properties is atribute hie :-9
                  position={"md:flex-row-reverse"}
                  heading={
                     <div className=" text-4xl font-semibold">
                        Master
                        <HighlightText text={" Coding Skills "} />
                        with Expert-Led Courses
                     </div>
                  }
                  subheading={
                     "Embark on a transformative coding journey with our comprehensive courses led by seasoned industry professionals. Gain invaluable insights and practical skills from experts who are dedicated to empowering you with the knowledge needed to excel in coding."
                  }
                  ctabtn1={{
                     btnText: "try it yourself",
                     linkto: "/signup",
                     active: true,
                  }}
                  ctabtn2={{
                     btnText: "Learn more",
                     linkto: "/login",
                     active: false,
                  }}
                  codeblock={codeBlockString.html}
                  codeColor={"text-yellow-50"}
               />

               <div className=" mb-[500px] " />
            </div>

            <div className=" relative w-11/12 ">
               <ExploreMore />
            </div>
         </div>

         {/* Section 2 */}

         <div className=" bg-pure-greys-5 text-richblack-700 ">
            {/* image */}

            <div className="homepage_bg h-[310px] ">
               <div className=" w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto ">
                  <div className=" h-[150px] "></div>

                  {/* two Botton */}

                  <div className="flex flex-row gap-7 text-white">
                     <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row items-center gap-3">
                           Explore Full Catalog
                           <FaArrowRight />
                        </div>
                     </CTAButton>

                     <CTAButton active={false} linkto={"/signup"}>
                        <div>Learn More</div>
                     </CTAButton>
                  </div>
               </div>
            </div>

            <div className=" mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
               <div className=" flex flex-col gap-4 md:flex-row md:gap-16 justify-between mt-[90px] ">
                  <div className=" text-4xl font-semibold ">
                     Get the skills you need for a
                     <HighlightText text={"Job that is in demand"} />
                  </div>

                  <div className=" flex flex-col gap-5 ">
                     <div className=" text-[16px] ">
                        The modern StudyNotion is the dictates its own terms.
                        Today, to be a competitive specialist requires more than
                        professional skills.
                     </div>

                     <div className=" w-fit md:mt-7 items-start ">
                        <CTAButton active={true} linkto={"/signup"}>
                           Learn More
                        </CTAButton>
                     </div>
                  </div>
               </div>

               <TimelineSection />

               <LearningLanguageSection />
            </div>
         </div>

         {/* Section 3 */}

         <div className=" w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter: bg-richblack-900 text-white  ">
            <InstructorSection />

            {/* <h2 className=" text-center text-4xl font-semibold mt-10 ">
          Review from Other Learners
        </h2>

        <div>
          <ReviewSlider />
        </div> */}
         </div>

         {/* Footer */}

         <Footer />
      </div>
   );
};

export default Home;
