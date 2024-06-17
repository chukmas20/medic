import React from 'react'

type RadioInputProps={
    name: string;
    className?: string;
    register: any;
    title: string;
    errors:any;
    radioOptions: RadioOption[];
}

export type RadioOption ={
  value : string;
  label: string;
} 
const RadioInput = (
    {
       className="col-span-full", 
       name,
        errors, 
        title, 
         register,
         radioOptions
        }:RadioInputProps) => {
   

  return (
    <div className="">
    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{title}</h3>
<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    {radioOptions?.map((item, i)=>{
        return(
              <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
                <input
                  {...register(`${name}`, {required:true})}
                   id={item.value} 
                  type="radio" 
                 value={item.value}
                  name={`${name}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {item.label}
                </label>
            </div>
        </li>
           
        )
    })}   
</ul>
  {errors[`${name}`] && (
        <span className="text-red-600 text-sm">{title} is required</span>)
      }
</div>
  )
}

export default RadioInput