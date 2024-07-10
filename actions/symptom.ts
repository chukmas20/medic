"use server";

import { SymptomProps } from "@/components/dashboard/SymptomForm";
import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";



export async function createSymptom(data:SymptomProps){
    try {
        const existingSymptom = await prismaClient.speciality.findUnique({
            where:{
                slug:data.slug
            }
        })
        if (existingSymptom){
            return{
                data: null,
                status: 409,
                error:"Symptom already exists"
            }
        }
        const newSymptom = await prismaClient.symptom.create({
            data
        })
        revalidatePath("/dashboard/symptoms")
        console.log(newSymptom)
        return{
            data: newSymptom,
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

export async function updatedSymptom(id:string, data:SymptomProps){
    try {
        const existingSymptom = await prismaClient.symptom.findUnique({
            where:{
                id
            }
        })
        if (!existingSymptom){
            return{
                data: null,
                status: 404,
                error:"Symptom with id does not exist"
            }
        }
        const updatedSymptom = await prismaClient.symptom.update({
            where:{
                id,
            },
            data
        })
        revalidatePath("/dashboard/symptoms")
        console.log(updatedSymptom)
        return{
            data: updatedSymptom,
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

export async function getSymptomBySlug(slug: string){
    try {
        if(slug){
           const symptom =  await prismaClient.symptom.findUnique({
                where:{
                    slug
                }
            })  
            return{
                data: symptom,
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


export async function getSymptoms(){
    try {
        const symptoms = await prismaClient.symptom.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })  
        console.log(symptoms)
        return{
            data: symptoms,
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



export async function createManySymptoms(){

    try {
        const symptoms = [
            {
                title:"Head Ache",
                slug: "headache",
            },
            {
                title:"Back Pain ",
                slug: "back-pain",
            },
            {
                title:"Anxiety",
                slug: "anxiety",
            },
            {
                title:"Migraine",
                slug: "migraine",
            },
            {
                title:"Sinus Infection",
                slug: "sinus-infection",
            },
            {
                title:"Weight Loss",
                slug: "weight-loss",
            },   
           ]
           for(const symptom of symptoms){
            try {
              await createSymptom(symptom)
            } catch (error) {
                console.log(`Error creating symptom ${symptom.title}, ${error}`)
               
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

export async function deleteSymptom(id: string){
    try {
         await prismaClient.symptom.delete({
            where:{
                id
            }
        })
        revalidatePath("/dashboard/symptoms")  
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