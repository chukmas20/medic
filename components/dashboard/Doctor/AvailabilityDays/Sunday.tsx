import { createAvailability, updateAvailabilityById } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import SelectedTimes from './SelectedTimes'

const Sunday = ({profile, day}:{profile:any, day: string}) => {
    const availability = profile?.availability || "";
    const initialData: string[] = profile?.availability[day] || [];

    const timesArray : string[] | any = [
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
    const [selectedTimes, setSelectedTimes] = useState<string[]>(initialData)
    const [loading, setLoading] = useState(false);
    console.log(selectedTimes)
    function handleAddTime(time: any){
        if(!selectedTimes.includes(time)){
            setSelectedTimes((prevTimes)=>[...prevTimes, time])
        }else{
            toast.error(`Selected tIme ${time} already exists and can't be added again`)
        }
    }
    function handleAddAll(){
        setSelectedTimes([...timesArray]) 
    }
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
                    sunday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await updateAvailabilityById(availability?.id,data);
                setLoading(false)
                toast.success("Updated Successfully")
                console.log(data)
            } else if(profile?.id){
                console.log("id is not set")
                const data = {
                    sunday: selectedTimes,
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
    <SelectedTimes 
    handleAddTime ={handleAddTime}
    timesArray ={timesArray}
    selectedTimes = {selectedTimes}
    loading = {loading}
    handleSubmit = {handleSubmit}
    clearAll = {clearAll}
    handleRemoveTime = {handleRemoveTime}
    handleAddAll={handleAddAll}
    day={day}
    />
  )
}

export default Sunday