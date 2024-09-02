import React from 'react'

const NotFound = () => {
  return (
    <main className='bg-slate-300 '>
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-center">
            <div className="pb-6">
              <img 
                    className=" md:w-38 md:h-28 "
                    src="https://utfs.io/f/9e828e54-7cd7-4bea-9f47-f2844c4fe763-1s9otp.png" 
                  />
            </div>
            <h3 className="text-yellow-800 text-4xl font-semibold sm:text-5xl">
                Page not found
            </h3>
            <p className="text-yellow-800 mt-3">
                Sorry, the page you are looking for could not be found or has been removed.
            </p>
        </div>
    </div>
</main>
  )
}

export default NotFound