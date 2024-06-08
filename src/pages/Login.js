import React from 'react';
import Template from '../components/common/Template';
import { useSelector } from 'react-redux';

function Login() {
  const {loading} = useSelector(
    (state) => (state.auth)
  );
  return (
    <div className=' text-white' >

      {
        loading ? 
        <div className=' w-[100vw] h-[90vh] flex flex-row mx-auto justify-center items-center' >
          <span className='loader' ></span>
        </div> :
        (
          <div className=' w-full max-h-full'>
            <Template
              heading = "Welcome Back"
              subHeading = "Build skills for today, tomorrow, and beyond. Education to future-proof your career."
              formType = "loginForm"
              btnText = "Sign in"
            />
          </div>
        )
      }

    </div>
  )
}

export default Login