import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';



const tabsName = [

  "Free",
  "New to Coding ",
  "Most Popular",
  "Skill Paths",
  "Career Paths",

];

const   ExploreMore = () => {

  // initial value of 
  // tab    -> free, 
  // course -> course of free tab, 
  // card   -> card of particular course
  const [currentTab, setCurrentTab] = useState(tabsName[0]); 
  const [courses, setCourse] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (element) => {

    setCurrentTab(element);
    const result = HomePageExplore.filter(
      (course) => {
        return course.tag === element;
      }
    );
    setCourse( result[0].courses );
    setCurrentCard( result[0].courses[0].heading );

  }
  
  return (
    <div>
        <div className=' text-4xl font-semibold text-center '>
          Unlock the 
          <HighlightText text={"Power of the Code"} />
        </div>

        <p className=' text-center text-richblack-300 text-[16px] mt-3 ' >
          Learn to build anything you can imagine
        </p>


        {/* Tab Commponent */}

        <div className='flex flex-row mt-5 mb-5 px-1 py-1 rounded-full bg-richblack-800 ' >

          {
            tabsName.map(
              (element, index) => {
                return (
                  
                  <div
                    className={`text-[16px] flex flex-row items-center gap-2
                    ${currentTab === element ? " bg-richblack-900 text-richblack-5 font-medium ": " text-richblack-200 " } 
                     rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 px-7 py-2 `}

                    key={index}
                    onClick={
                      () => setMyCards(element)
                    }
                  >
                    {element}
                  </div>

                )
              }
            )
          }

        </div>


        {/* Card Commponent */}

        {/* <CourseCard/> Commponent bane ka hie */}

        {/* <div className=' lg:h-[150px] '>

          <div className=' absolute flex flex-row gap-10 justify-between w-full '>
            {
              courses.map(
                (element, index) => {
                  return (
                    <CourseCard
                      key={index}
                      cardData = {element}
                      currentCard = {currentCard}
                      setCurrentCard = {setCurrentCard}
                    />
                  )
                }
              )
            }
          </div>

        </div> */}
    </div>
  )
}

export default ExploreMore