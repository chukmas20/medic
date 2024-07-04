import { createAvailability, updateAvailabilityById } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Friday = ({profile}:{profile:any}) => {
    const availability = profile?.availability || ""
    const timesArray = [
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
         "1:00 PM",
         "2:00 PM",
         "3:00 PM",
         "4:00 PM",
         "5:00 PM",
         ,"6:00 PM"        
    ]
    const [selectedTimes, setSelectedTimes] = useState(["8:00 AM", "9:00 AM"])
    const [loading, setLoading] = useState(false);
    console.log(selectedTimes)
    function handleAddTime(time: any){
        if(!selectedTimes.includes(time)){
            setSelectedTimes((prevTimes)=>[...prevTimes, time])
        }else{
            toast.error(`Selected tIme ${time} already exists and can't be added again`)
        }
    }
    // function handleAddAll(){
    //     setSelectedTimes([...timesArray]) 
    // }
    function clearAll(){
        setSelectedTimes([]) 
    }
    function handleRemoveTime(index: number){
        const updatedTime = selectedTimes.filter((_,i)=> i !== index)
        setSelectedTimes(updatedTime)
     }
    async function handleSubmit(){
        setLoading(true)
        try {
            if(profile?.id && availability?.id){
                const data = {
                    friday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await updateAvailabilityById(availability?.id,data);
                setLoading(false)
                toast.success("Updated Successfully")
                console.log(data)
            } else if(profile?.id){
                console.log("id is not set")
                const data = {
                    friday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await createAvailability(data);
                setLoading(false)
            }else{
                console.log("Profile Id not set")
            } 
        } catch (error) {
            
        } 
    }
  return (
    <div className=' grid grid-cols-1 border border-yellow-500 sm:grid-cols-2 shadow-md rounded-md'>
        <div className='p-4'> 
            <h2  className='font-semibold'>Select your availability Time for this day</h2>
            <div className='py-6 flex flex-wrap'>
                 {/* <button 
                     onClick={handleAddAll}
                      className='flex items-center justify-center  rounded-md py-2 px-2 text-sm border border-yellow-100'>
                       <span>Add All</span>
                        <Plus className='h-3 w-3 ml-2'/>
                    </button> */}
                {
                    timesArray.map((time,i)=>{
                        return(
                          <button 
                           onClick={()=> handleAddTime(time)}
                           key={i} 
                            className='flex  items-center justify-center  rounded-md py-2 px-2 text-sm border border-yellow-100'>
                             <span>{time}</span>
                             {time && (
                               <Plus className='h-3 w-3 ml-2'/>
                              )}
                          </button>
                        )
                    })
                }
                
            </div>
        </div>
        <div className='p-4'> 
            <h2 className='font-semibold'>Here is your selected Time </h2>
            <div className='py-6 flex flex-wrap'>
                {
                    selectedTimes.map((time,i)=>{
                        return(
                          <button 
                          onClick={()=> handleRemoveTime(i)}
                           key={i} 
                            className='flex items-center bg-yellow-300 justify-center rounded-md py-2 px-2 text-sm border border-yellow-100'>
                             <span>{time}</span>
                             <X className='h-3 w-3 ml-2'/>
                          </button>
                        )
                    })
                }
            </div>
            {selectedTimes.length > 0 && (
                <>
                   <div className="border-t border-yellow-50  pt-2 w-44 ">
                     {
                      loading ? <Button disabled={loading} className='bg-yellow-600 hover:bg-yellow-500'>
                          <Loader className='animate-spin w-4 h-4'/>
                          Please wait ...
                        </Button>:(
                        <Button className='bg-yellow-500 hover:bg-yellow-600' disabled={loading} onClick={handleSubmit}>Save settings</Button>
                      )
                     }
                     
                    </div>
                    <button 
                     onClick={clearAll}
                     className='flex mt-4 items-center justify-center  rounded-md py-2 px-2 text-sm border border-yellow-100'>
                     <span>Clear All</span>
                     <X className='h-3 w-3 ml-2'/>
                  </button>
                </>
            )}     
      </div>
    </div>
  )
}

export default Friday