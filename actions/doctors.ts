"use server";

import { prismaClient } from "@/lib/db";
import { Doctor } from "@/types/type";
import generateSlug from "@/utils/generateSlug";





export async function getDoctorsBySlug(slug: string){
    try {
        if(slug){
            let doctors:Doctor[] | undefined  = []
           const service =  await prismaClient.service.findUnique({
                where:{
                    slug
                },
                include:{
                    // doctors:{
                    //     include:{
                    //         doctorProfile:{
                    //             include:{
                    //                 availability: true
                    //             }
                    //         }
                    //     }
                    // },
                    doctorProfiles:{
                        include:{
                            availability:true
                        }
                    }
                }
            }) 
             doctors =  service?.doctorProfiles.map((doc)=>{
                return{
                    id:doc.userId,
                    name:`${doc.firstName} ${doc.lastName}`,
                    email:doc.email??"",
                    phone:doc.phone??"",
                    slug: generateSlug(`${doc.firstName} ${doc.lastName}`),
                    doctorProfile:doc
                }
             })
            return doctors
        } 
        
    } catch (error) {
        console.log(error)
        return []
    }
}








