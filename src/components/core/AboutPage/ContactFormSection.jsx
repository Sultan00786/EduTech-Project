import React from 'react'
import ContactUsForm from '../../contactPage/ContactUsForm'

function ContactFormSection() {
  return (
    <div className=' w-fit mx-auto' >
        <h1>Get in Touch</h1>
        <p>
            We'd love to here for you, Please fill out this form.
        </p>
        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection