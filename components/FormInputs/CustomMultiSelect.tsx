import { MultiSelect } from "react-multi-select-component";


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

export default function CustomMultiSelect({
    label,
    className,
    optionTitle,
    options = [],
    selectedOption,
    setSelectedOption,
}:ShadSelectInputProps)
    
 {
  return (
    <MultiSelect
    options={options}
    value={selectedOption}
    onChange={setSelectedOption}
    labelledBy={optionTitle}
  />
  )
}
