export function getLongDate(dateString: string): string {
     const daysOfWeek = [
        "sunday", 
        "monday",
         "tuesday",
         "wednesday",
          "thursday",
           "friday", 
           "saturday"
     ]
     const monthsOfYear = [
        "january", 
        "february",
         "march",
         "april",
          "may",
           "june", 
           "july",
           "august",
           "september",
           "october",
           "november",
           "december"
     ]

     const date = new Date(dateString);
     const dayName = daysOfWeek[date.getDay()]
     const monthName = monthsOfYear[date.getMonth()]
     const dayOfMonth = date.getDate();

     return `${dayName}, ${monthName}  ${dayOfMonth}`
}

// // Example usage
// const dateString = "Fri May 31 2024 GMT+0300 (West Africa Time)";
// const formattedDate = getLongDate(dateString);
// console.log(`Formatted date: ${formattedDate}`);
