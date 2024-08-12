import { Speciality } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type  LinkCardsProps = {
  className?: string,
  specialties: Speciality[]

}
const LinkCards = ({className, specialties}:LinkCardsProps) => {
  return (
    <div className='grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-6'>
       {
        specialties && specialties.map((item)=>{
          return(
            <Link
             key={item.id}
             href={`/specialty/${item.slug}`}
             className={`rounded-md py-3 px-6 flex gap-4 bg-slate-800 text-slate-50 
             ${className}`}>
            <h2>{item.title}</h2>
            <span aria-hidden="true">&rarr;</span>
            </Link>
          )
        })
       }
      </div>
  )
}

export default LinkCards