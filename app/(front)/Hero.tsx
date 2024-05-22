import React from 'react';
import SearchBar from "./SearchBar"
import TransitionText from './TransitionText';

const HeroSection= () => {
  return (
    <div className="bg-yellow-600 " >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 min-h-lvh   lg:py-14 lg:px-14 p-8  ">
        <div className="text-white mt-10 ">
          <p className="lg:text-5xl lg:text-start text-3xl text-center font-bold">
              Get Yourself A Doctor <br /> Within Seconds
          </p><br/>
          <p className="lg:text-2xl lg:text-start text-sm text-center">
             Simply create an account to find a doctor <br/> that is just a stone throw away
          </p>
           <button className="bg-blue-800  hover:bg-blue-700 mt-6 text-white font-sm py-2 px-4 rounded-md">
               Get Started
            </button>
          <div className='xl:mr-[250px] mt-10'>
            <SearchBar  />
          </div>

        </div>
        <div className="mt-10">
          <img
            src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="hero"

            className="w-full h-90 rounded-md "
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection