import { DoctorProfileAvailability } from "@/types/type";

export function getDayFromDate(dateString: string | undefined){
     // Array of weekday names
     const daysOfWeek:(keyof DoctorProfileAvailability)[] = [
        "sunday", 
        "monday",
         "tuesday",
         "wednesday",
          "thursday",
           "friday", 
           "saturday"
        ];
    if(dateString){
       // Parse the date string into a Date object
    const date = new Date(dateString);
   
    // Get the current day of the week as a number (0-6)
    const dayIndex = date.getDay();
     
    return daysOfWeek[dayIndex];
  }
  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  return dayName;
 }
   