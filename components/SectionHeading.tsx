import React from 'react'

const SectionHeading = ({title}:{title:string}) => {
  return (
    <h2 className='mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]'>
        {title}
    </h2>
  )
}

export default SectionHeading