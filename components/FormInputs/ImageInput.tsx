import { UploadDropzone } from '@/utils/uploadthing';
import { Pencil } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

const ImageInput = ({
    label,
    imageUrl = "",
    setImageUrl,
    className= "col-span-full",
    endpoint = "",
}:{
    label: string;
    imageUrl: string;
    setImageUrl: any;
    className?: string;
    endpoint: any

}) => {
  return (
     <div className={className}>
         <div className='flex justify-between items-center mb-4'>
            <label htmlFor='course-image'
             className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2'
            >
                {label}
            </label>
            { imageUrl  && (
                <button onClick={()=>setImageUrl("")}
                >
                    <Pencil className='w-5 h-5'   />
                    <span> Change Image</span>
                </button>
            )}
         </div>
          {imageUrl ? (
            <img
             src={imageUrl}
             alt='Item Image'
             width={500}
             height={500}
             className='w-full h-64 object-contain' />
          ):(
            <UploadDropzone
              endpoint={`${endpoint}` as any}
              onClientUploadComplete={(res:any)=>{
                setImageUrl(res[0].url)
                //Do something with the response
                toast.success("Image Upload Complete");
                console.log("Files: ", res);
                console.log("Upload Completed")
              }}
            />
          )}
     </div>
  )
}

export default ImageInput