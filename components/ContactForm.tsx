"use client";

import SubmitButton from '@/components/FormInputs/SubmitButton'

import React, { useState } from 'react'

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img 
              className=" md:w-38 md:h-28 "
              src="https://utfs.io/f/9e828e54-7cd7-4bea-9f47-f2844c4fe763-1s9otp.png" 
            />
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Contact Us
      </h2>
    </div>

    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  className="space-y-4">
      <div className="mt-2">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Name
         </label>
          <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type='text'
              placeholder='Enter your name'
            />
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
              Email
           </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type='email'
              placeholder='Enter your email'
            />
             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
              Message
           </label>
            <textarea
              className="block textarea w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder='Enter your email'
            />
             </div>
          <div>
          <SubmitButton 
           title="Submit"
            buttonType="submit" 
            loadingTitle="Please wait..." 
            isLoading={isLoading}
           />
        </div>
      </form>
    </div>
  </div>
  )
}

export default ContactForm