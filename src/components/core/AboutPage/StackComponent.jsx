import React from 'react'

const stats = [
    {
        count: "5K",
        label: "Active Students"
    },
    {
        count: "10+",
        label: "Mentors"
    },
    {
        count: "200+",
        label: "Courses"
    },
    {
        count: "50+",
        label: "Awards"
    },
];

function StackComponent() {
  return (
    <section className=' border-b-[1px] border-richblack-600 ' >
        <div>
            <div className=' w-full h-[250px] bg-richblack-800 flex flex-row justify-evenly items-center gap-x-4' >
                {
                    stats.map( (stat, index)=> (
                        <div className='flex flex-col items-center gap-1' >
                            <h1 className=' text-3xl font-semibold ' > {stat.count} </h1>
                            <h1 className=' text-richblack-300 text-xl ' > {stat.label} </h1>
                        </div>
                    ) )
                }
            </div>
        </div>
    </section>
  )
}

export default StackComponent;