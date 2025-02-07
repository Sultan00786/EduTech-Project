import React, { useEffect } from 'react'
import Template from '../components/common/Template'
import { useSelector } from 'react-redux'

function Signup() {



  const {loading} = useSelector(
    (state) => state.auth
  );

  return (
    
     <div className=' text-white' >
      {
        loading ? 
        <div className=' w-[100vw] h-[90vh] flex flex-row mx-auto justify-center items-center' >
          <span className='loader' ></span>
        </div> :
        (
          <div>
            <Template
              heading = "Join the millions learning to code with StudyNotion for free"
              subHeading = "Build skills for today, tomorrow, and beyond. Education to future-proof your career."
              formType = "signForm"
              btnText = "Create Account"
            />
          </div>
        )
      }

      </div>
     

    
  )
}

export default Signup