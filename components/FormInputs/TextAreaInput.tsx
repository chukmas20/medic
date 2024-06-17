import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type  TextAreaInputProps ={
    label: string;
    register: any;
    name: string;
    errors: any;
    className?: string
  }

export default function TextAreaInput({
    label, register, name, errors, className="col-span-full"
}:TextAreaInputProps) {
    
  return (
    <div className="grid w-full gap-1.5">
      <label htmlFor={`${name}`} 
        className="block text-sm font-medium leading-6 text-gray-900"
       >
        {label}
     </label>
     <Textarea
       {...register(`${name}`, {required:true})}
        id={`${name}`}
        name={`${name}`}
         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
         {errors[`${name}`] && (
             <span className="text-red-600 text-sm">{label} is required</span>)
          }
    </div>
  )
}
