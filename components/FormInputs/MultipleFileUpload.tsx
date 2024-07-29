import { File, Pencil, XCircle } from 'lucide-react';
import { UploadDropzone } from '@/utils/uploadthing';

import { title } from 'process';
import React from 'react'
import toast from 'react-hot-toast';

type  MultipleImageInputProps ={
    label: string;
    files: FileProps[];
    setFiles: any;
    className?: string;
    endpoint?: any
}
export type FileProps = {
    title: string;
    size: number;
    url: string;
}
const MultipleFileUpload = ({
   label,
   files,
   setFiles,
   className,
   endpoint
}:MultipleImageInputProps) => {

    function handleImageRemove(fileIndex: any){
        const updatedFiles = files.filter(
            (file, index) => index !== fileIndex
        )
        setFiles(updatedFiles)
    }
  return (
     <div className={className}>
         <div className=' mb-4'>
            <label htmlFor='course-image'
             className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2'
            >
                {label}
            </label>
            { files  && (
                <button className='text-sm flex text-white rounded-md justify-center px-2 py-2 bg-yellow-500 hover:bg-yellow-600' 
                 onClick={()=>setFiles([])}
                >
                    <Pencil className='w-5 h-5 mr-1 '   />
                    <span> Change File</span>
                </button>
            )}
             {files.length > 0 ? (
                <div 
                   className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4'
                   >
                    {files.map((file,i)=>{
                        return(
                            <div key={i} className='relative mb-6'>
                               <button
                                type='button'
                                onClick={()=> handleImageRemove(i)}
                                className='absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full'
                                >
                                   <XCircle className='' />
                               </button>
                               <div className='py-3 px-6 rounded-md flex items-center bg-slate-200 dark:bg-slate-800  text-slate-800 dark:text-slate-200 '>
                                     <File className='w-6 h-6 flex-shrink-0 mr-2'  />
                                     <div className=" flex flex-col items-center">
                                        <span className='line-clamp-1'>{file.title}</span>
                                        <span className='text-xs'>{(file.size /1000).toFixed(2)} {" "} kbs</span>
                                     </div>
                               </div>
                            </div>
                        )
                    })}
                </div>
             ):(
                <UploadDropzone
                  endpoint={endpoint}
                onClientUploadComplete={(res) => {
                  console.log(res);
                   const urls = res.map((item)=>{
                      return {
                        url: item.url,
                        title: item.name,
                        size:item.size
                      }     
                   })
                   setFiles(urls);
                   console.log(urls);
                   console.log("Upload completed")
                }}
                 onUploadError={(error)=>{
                    toast.error("Unable to Upload Image, Try Again")
                    console.log(`Error! ${error.message},`, error)
                 }}
              />
             )}
         </div>
     </div>
  )
}

export default MultipleFileUpload;