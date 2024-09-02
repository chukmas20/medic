import { Button } from '@/components/ui/button'

import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-12'  style={{padding:"50px"}}>
    <div>
        
    </div>
    <h3 style={{marginTop:"20px"}}className=" text-center scroll-m-20 text-2xl text-yellow-500  font-semibold tracking-tight">
        Contact Us
    </h3>
    <p className='font-light text-xs tracking-tight  mt-4'>
        Please get in touch with us whether you are a provider or patient for any kind of
        enquiries with regards to how the kuik-doctor website works. If you have any issues with our services
        or while you use this website please don't hesitate to contact us
    </p>
    <form className="max-w-sm mx-auto">
        <div className="mb-5">
            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
       <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
        <Button className='mt-8'> Submit</Button>
        </form>
 </div>
   
  )
}

export default page