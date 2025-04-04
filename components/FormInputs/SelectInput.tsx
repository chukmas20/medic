import React from "react";


type  SelectInputProps ={
    label: string;
    register?: any;
    name: string;
    errors?: any;
    type?: string;
    className?: string;
    options?: selectOption[] ;
  }

  export type selectOption ={
     label : string;
    value: string;
  } 

export default function SelectInput({
  label, name,type, className, register, options,
}:SelectInputProps) {


    
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options?.map((option, i) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}