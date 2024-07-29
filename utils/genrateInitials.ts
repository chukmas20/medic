 
export function generateInitials(name: string | null | undefined){
    if(name){
        //Split the name into an array of words
      const nameParts = name!.split(" ")
      //Map it word to its first letter and convert to uppercase
    const initials = nameParts.map(part => part.charAt(0).toUpperCase())
    //Join the initials to form the final string
    return initials.join("")
    }else{
        return "CN";
    }
   
    
  }