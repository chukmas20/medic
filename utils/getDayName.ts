import { DoctorProfileAvailability } from "@/types/type";

export const getDayName =(): keyof DoctorProfileAvailability=>{
    const daysOfWeek: (keyof DoctorProfileAvailability)[] = [
       "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
    ];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    return dayName;
 };