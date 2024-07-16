"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerInputProps ={
   date: Date | undefined;
   setDate: any;
   className?: string;
   title: string;
}

import { useState } from 'react';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function DatePickerInput({date, setDate, title,className=""}:DatePickerInputProps) {

  return (
    <div >
      <h2 className="text-base font-normal">{title}</h2>
      <DatePicker
        className="z-50 bg-slate-50 react-date-picker__wrapper dark:bg-slate-900 py-1.5 px-2"
         onChange={setDate} 
        value={date}
       />
    </div>
   
  )
}
