"use server";

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "@/types/type";
import { revalidatePath } from "next/cache";

export async function createService(data:ServiceProps){
    try {
        const existingService = await prismaClient.service.findUnique({
            where:{
                slug:data.slug
            }
        })
        if (existingService){
            return{
                data: null,
                status: 409,
                error:"Service already exists"
            }
        }
        const newService = await prismaClient.service.create({
            data
        })
        revalidatePath("/dashboard/services")
        console.log(newService)
        return{
            data: newService,
            status: 201,
            error: null
        }
    } catch (error) {
        console.log(error)
        return{
            data: null,
            status: 500,
            error
        }
    }
}


export async function getServices(){
    try {
        const services = await prismaClient.service.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })  
        console.log(services)
        return{
            data: services,
            status: 200,
            error: null
        }
    } catch (error) {
        console.log(error)
        return{
            data: null,
            status: 500,
            error
        }
    }
}

export async function createManyServices(){

    try {
        const services = [
            {
                title:"Telehealth",
                slug: "tele-health",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/3063/3063106.png"
            },
            {
                title:"In-person doctor vist ",
                slug: "inperson-visit",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/3439/3439472.png"
            },
            {
                title:"UTI consult",
                slug: "uti-consult",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/9998/9998629.png"
            },
            {
                title:"Mental Health",
                slug: "mental-health",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/2732/2732589.png"
            },
            {
                title:"Ante Natal",
                slug: "ante-natal",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/6462/6462220.png"
            },
            {
                title:"Erectile Dysfunction",
                slug: "ante-natal",
                imageUrl: "https://cdn-icons-png.flaticon.com/128/16543/16543848.png"
            },   
           ]
           for(const service of services){
            try {
              await createService(service)
            } catch (error) {
                console.log(`Error creating service ${service.title}, ${error}`)
               
            }
           }
       } catch (error) {
         return{
            data: null,
            status: 500,
            error
         }
     }

    
      
  
}