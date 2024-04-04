import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Botton from '../core/Homepage/Botton';
import CountryCode from "../../data/countrycode.json";

function ContactUsForm() {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    useEffect( ()=>{
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phonenumber: "",
            })
        }
    }, [reset, isSubmitSuccessful] );

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactu) // --> Incomplete hie
            const response = {
                status: "OK",
            }
            console.log("Logging response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(true);
        }
    }

  return (
    <form onSubmit={ handleSubmit(submitContactForm) }>
        <div className='flex gap-4' >
            {/* firstName */}
            <div className='flex flex-col' >
                <label htmlFor='firstname'>First Name</label>
                <input
                    type='text'
                    id='firstname'
                    name='firstname'
                    className=' text-black'
                    placeholder='Enter first name'
                    {...register( "firstname", {required:true} )}
                />
                {
                    errors.firstname && (
                        <span>Please Enter Your Name</span>
                    )
                }
            </div>

            {/* lastName */}
            <div className='flex flex-col' >
                <label htmlFor='lastname'>Last Name</label>
                <input
                    type='text'
                    id='lastname'
                    name='lastname'
                    className=' text-black'
                    placeholder='Enter first name'
                    {...register( "lastname" )}
                />
            </div>
        </div>

        {/* email */}
        <div className='flex flex-col'>
            <label htmlFor='email' >Email Address</label>
            <input
                type='email'
                name='email'
                id='email'
                className=' text-black'
                placeholder='Enter email Address'
                {
                    ...register(
                        "email",
                        {required: true}
                    )
                }
            />
            {
                errors.email && (
                    <span>Please Enter your email Address</span>
                )
            }
        </div>

        {/* Phone No. */}
        <div className='flex flex-col gap-2'>

            <label htmlFor='phonenumber'>
                Phone Number
            </label>

            <div className=' flex flex-row gap-2' >

                {/* dropdown */}
                <select
                    name='dropdown'
                    id='dropdown'
                    className=' text-black w-[25%] '                            // w-[25%] --> yaha fasa tha --> parent div remove karna pada
                    {
                        ...register(
                            "contyCodeDropdown",
                            {required:true}
                        )
                    }
                >
                    {
                        CountryCode.map( (element, index) => {
                            return(
                                <option key={index} value={element.code} >
                                    {element.code} - {element.country}
                                </option>
                            )
                        } )
                    }
                </select>
                
                {/* phone no. div */}
                <input
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='12345 67890'
                    className=' text-black w-[76%]'                                 // w-[76%] --> yaha fasa tha --> iska bee parent div remove karna pada
                    {
                        ...register(
                            "phonenumber",          // registor as
                            {
                                required: {
                                    value: true,
                                    message: "Please enter Phone No."
                                },
                                maxLength: {
                                    value: 10, 
                                    message: "Invalid Phone Number",
                                },
                                minLength: {
                                    value: 10, 
                                    message: "Invalid Phone Number",
                                }
                            }
                        )
                    }
                />
            </div>
            {
                errors.phonenumber && (
                    <span>
                        {errors.phonenumber.message}
                    </span>
                )
            }

        </div>

        {/* message  */}
        <div className='flex flex-col'>
            <label htmlFor='message' >message</label>
            <textarea
                name='message'
                id="message"
                className=' text-black'
                cols={30}
                rows={7}
                placeholder='Enter Your message here'
                {...register("message", {required: true})}
            />
            {
                errors.message && (
                    <span>Please enter your messasge</span>
                )
            }
        </div>

        <button type='submit' onClick={handleSubmit(submitContactForm)} className="w-full"  >
            <Botton active={true} children={"Send message"} />
        </button>
    </form>
  )
}

export default ContactUsForm