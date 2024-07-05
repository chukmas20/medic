import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'




type SelectedProps = {
    // handleAddAll: ()=> void
    handleAddTime: (time:string)=> void;
    timesArray : string[];
    selectedTimes :string[];
    loading: boolean;
    handleSubmit: ()=> void;
    clearAll : ()=> void;
    handleRemoveTime:(i: number)=> void
}

export default function SelectedTimes({
    //   handleAddAll, 
      handleAddTime,
      timesArray,
      selectedTimes,
      loading,
      handleSubmit,
      clearAll,
      handleRemoveTime
    }:SelectedProps) {
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
                timesArray?.map((time,i)=>{
                    return(
                      <button 
                       onClick={()=> handleAddTime(time)}
                       key={i} 
                        className='flex  items-center justify-center  rounded-md py-2 px-2 text-sm border border-yellow-100'>
                         <span>{time}</span>
                         <Plus className='h-3 w-3 ml-2'/>
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
                       key={i} 
                       onClick={()=> handleRemoveTime(i)}
                        className='flex items-center bg-yellow-300 justify-center rounded-md py-2 px-2 text-sm border border-yellow-100'>
                         <span>{time}</span>
                         
                           <X className='h-3 w-3 ml-2'/>
                      </button>
                    )
                })
            }
        </div>
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
        </div>
   </div>
  )
}
