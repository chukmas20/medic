import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ShadSelectInputProps ={
    label: string;
    optionTitle: string;
    className?: string;
    options: SelectOption[];
    selectedOption: any;
    setSelectedOption: any;
}

export type SelectOption ={
   value: string;
   label: string;
}

export default function ShadSelectInput({
    label,
    className,
    optionTitle,
    options = [],
    selectedOption,
    setSelectedOption,
}:ShadSelectInputProps)
    
 {
  return (
    <Select onValueChange={(value)=> setSelectedOption(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${optionTitle}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectLabel >{optionTitle}</SelectLabel>
         {options?.map((option, i)=>{
           return(
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
           )
         })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
