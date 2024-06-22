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
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{optionTitle}</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
