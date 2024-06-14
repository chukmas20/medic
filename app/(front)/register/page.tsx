import RegisterForm from '@/components/Auth/RegisterForm'
import React from 'react'

const page = ({
    searchParams,
}:{
    searchParams: {[key: string]: string | string[] | undefined}
}) => {
    const {role, plan} = searchParams;
    console.log(role,plan)
    return (
        <div className='bg-yellow-100 min-h-screen py-8'>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full  bg-white border border-gray-200 
               max-w-5xl mx-auto rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                <div className='hidden  md:flex linear-bg '>
                    {/* image */}
                </div>
                <div className=''>
                    <RegisterForm role={role} plan={plan} />
                </div>
            </div>
        </div>
    )
}

export default page