import React from 'react';
import HighlightText from '../Homepage/HighlightText';
import Botton from '../Homepage/Botton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

function LearningGrid() {
  return (
    <div className=' w-[80%] mx-auto grid items-center lg:grid-cols-4 mb-10' >
        {
            LearningGridArray.map( (item, index)=> (
                <div
                    className={`
                    ${index === 0 && " col-span-2 " }
                    ${ item.order & 1 === 1 ? " bg-richblack-800 " : " bg-richblack-700 " }
                    ${ item.order == 3 && " col-start-2 " }
                    `}
                >
                    {
                        item.order < 0 ?
                        (<div className=" h-[310px] bg-richblack-900 pt-5 pl-4 pr-4  ">
                            <h1 className=' text-4xl mb-5 ' >
                                {item.heading} <br/>
                                <HighlightText text={item.highlightText} className="" />
                            </h1>
                            <p className=' text-[17px] text-richblack-200 mb-12 ' >
                                {item.description}
                            </p>
                            <div className=' w-fit' >
                                <Botton children={item.BtnText} linkto={item.BtnLink} active={true}  />
                            </div>

                        </div>) :
                        (<div className='h-[310px] pt-7 pl-6 pr-9 ' >
                            <h1 className=' text-xl mb-5 ' > {item.heading} </h1>
                            <p className=' text-[17px] text-richblack-200 '> {item.description} </p>
                        </div>)
                    }
                </div>
            ) )
        }
    </div>
  )
}

export default LearningGrid