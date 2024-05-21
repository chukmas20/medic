import React, { ReactNode } from 'react'

export default function Layout({children}:{children : React.ReactNode}) {
  return (
    <div>
        <h1>Dashboard Pages onlys</h1>
        {children}
    </div>
  )
}
