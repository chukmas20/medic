import React, { ReactNode } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Providers = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
        {children}
    </div>
  )
}

export default Providers