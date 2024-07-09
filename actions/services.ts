"use server";

import { SpecialtyProps } from "@/components/dashboard/SpecialtyForm";
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

export async function createSpecialty(data:SpecialtyProps){
    try {
        const existingSpecialty = await prismaClient.speciality.findUnique({
            where:{
                slug:data.slug
            }
        })
        if (existingSpecialty){
            return{
                data: null,
                status: 409,
                error:"Specialty already exists"
            }
        }
        const newSpecialty = await prismaClient.speciality.create({
            data
        })
        revalidatePath("/dashboard/specialties")
        console.log(newSpecialty)
        return{
            data: newSpecialty,
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




export async function getSpecialties(){
    try {
        const specialities = await prismaClient.speciality.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })  
        console.log(specialities )
        return{
            data: specialities,
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


export async function deleteServices(id: string){
    try {
         await prismaClient.service.delete({
            where:{
                id
            }
        })  
        revalidatePath("/dashboard/services")  
        return{
            ok: true,
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

export async function createManySpecialties(){

    try {
        const specialties = [
            {
                title:"Dermatology",
                slug: "dermatology",
            },
            {
                title:"Primary Care ",
                slug: "primary-care",
            },
            {
                title:"Men's Health",
                slug: "mens-health",
            },
            {
                title:"Women's Health",
                slug: "womens-health",
            },
            {
                title:"Dental",
                slug: "dental",
            },
            {
                title:"ENT",
                slug: "ent",
            },   
           ]
           for(const specialty of specialties){
            try {
              await createSpecialty(specialty)
            } catch (error) {
                console.log(`Error creating service ${specialty.title}, ${error}`)
               
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

export async function deleteSpecialty(id: string){
    try {
         await prismaClient.speciality.delete({
            where:{
                id
            }
        })
        revalidatePath("/dashboard/specialties")  
        return{
            ok: true,
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