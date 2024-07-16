"use client";
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Providers = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
        {children}
    </SessionProvider>
  )
}

export default Providers