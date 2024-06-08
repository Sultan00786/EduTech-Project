import React from "react";
import HighlightText from "../components/core/Homepage/HighlightText";
import Image1 from "../assets/Images/aboutus1.webp";
import Image2 from "../assets/Images/aboutus2.webp";
import Image3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StackComponent from "../components/core/AboutPage/StackComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";

function About() {
  return (
    <div className=" text-white mt-1 mx-auto ">
      {/* Section 1 */}
      <section className=" bg-richblack-800 pt-20 pb-52 ">
        <h1 className=" text-center text-[19px] leading-normal font-inter font-semibold text-richblack-300 mb-16 ">
          {" "}
          About Us{" "}
        </h1>

        <div className=" static ">
          <div className=" flex flex-col items-center w-[860px] text-4xl font-semibold mx-auto ">
            Driving Innovation in Online Education for a <br />{" "}
            <HighlightText text={"Brighter Future"} />
            <p className=" text-center text-[17px] leading-normal font-inter font-normal text-richblack-300 mt-4 mb-16 ">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className=" absolute -bottom-12 left-[12%] w-fit flex gap-x-5 ">
            <img src={Image1} />
            <img src={Image2} />
            <img src={Image3} />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className=" pt-44 pb-24 border-b-[1px] border-richblack-600 ">
        <div className=" w-[80%] mx-auto">
          <Quote />
        </div>
      </section>

      {/* Section 3 */}
      <section className=" py-32 mx-auto ">
        <div className=" w-[80%] mx-auto flex flex-col gap-44">
          {/* Founding Storin div */}
          <div className="flex flex-row gap-24 ">
            <div className=" w-1/2 ">
              <h1 className=" text-4xl bg-gradient-to-tl from-rose-600 to-purple-900 font-semibold mb-5 ">
                Our Founding Story
              </h1>
              <p className=" text-[16px] text-richblack-300 pr-4 ">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <br />
              <p className=" text-[16px] text-richblack-300 pr-4 ">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className=" w-1/2">
              <img src={FoundingStory} />
            </div>
          </div>

          {/* Vison and mission div */}
          <div className="flex flex-row gap-24 ">
            {/* Left  */}
            <div>
              <h1 className=" text-4xl font-semibold mb-5 ">Our Vision</h1>
              <p className=" text-[16px] text-richblack-300 pr-4 ">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            {/* Right */}
            <div>
              <h1 className=" text-4xl font-semibold mb-5 ">Our Mission</h1>
              <p className=" text-[16px] text-richblack-300 pr-4 ">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <StackComponent />

      {/* Section 5 */}
      <section className=" w-full mx-auto mt-32 mb-[150px] ">
        <LearningGrid />
      </section>

      <section className="flex flex-col items-center">
        {/* <div className="mt-36"></div> */}
        <div className="">
          <ContactFormSection
            heading="Get in Touch"
            paragraph="We'd love to here for you, Please fill out this form."
          />
        </div>
      </section>

      {/* Section 6 */}
      <section>
        <h1>Review From other learners</h1>
        {/* <ReviewSlider/> */}
      </section>

      <Footer />
    </div>
  );
}

export default About;
