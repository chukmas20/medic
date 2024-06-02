import { Loader } from 'lucide-react';
import React from 'react'


type SubmitButtonProps ={
    title: string;
    buttonType?:  "submit" | "reset" | "button" | undefined;
    isLoading: boolean;
    loadingTitle: string;
}

const SubmitButton = ({title, buttonType="submit",loadingTitle,isLoading=false}:SubmitButtonProps) => {
    
  return (
    <>
      {isLoading ? (
         <button
         type={buttonType}
         disabled
         className="flex w-full
          justify-center rounded-md bg-yellow-600 px-3 py-1.5
           text-sm font-semibold leading-6 text-white shadow-sm
            hover:bg-yellow-800 focus-visible:outline focus-visible:outline-2
             items-center
             focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           <Loader className='w-4 h-4 mr-2 flex-shrink-0 animate-spin' /> {loadingTitle}
       </button>
      ):(
        <button
        type={buttonType}
        className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         >
         {title}
      </button>
      )}   
    </>
  )
}

export default SubmitButton