"use server";

import { SpecialtyProps } from "@/components/dashboard/SpecialtyForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";



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

export async function updateSpecialty(id:string, data:SpecialtyProps){
    try {
        const existingSpecialty = await prismaClient.speciality.findUnique({
            where:{
                id
            }
        })
        if (!existingSpecialty){
            return{
                data: null,
                status: 404,
                error:"Specialty with id does not exist"
            }
        }
        const updatedSpecialty = await prismaClient.speciality.update({
            where:{
                id,
            },
            data
        })
        revalidatePath("/dashboard/specialties")
        console.log(updatedSpecialty)
        return{
            data: updatedSpecialty,
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

export async function getSpecialtyBySlug(slug: string){
    try {
        if(slug){
           const specialty =  await prismaClient.speciality.findUnique({
                where:{
                    slug
                }
            })  
            return{
                data: specialty,
                status: 200,
                error: null
            }
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
                console.log(`Error creating specialty ${specialty.title}, ${error}`)
               
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