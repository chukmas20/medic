import React from 'react'

const NotFound = () => {
  return (
    <main className='bg-slate-300 '>
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-center">
            <div className="pb-6">
                <img src="https://utfs.io/f/f58b4f21-b50d-4710-9ff1-54dad8a7effc-zcjszo.png"
                   width={150} className="mx-auto rounded-full" 
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