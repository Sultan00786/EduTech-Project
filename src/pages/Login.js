import React from 'react';
import Template from '../components/common/Template';

function Login() {
  return (
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

export default Login