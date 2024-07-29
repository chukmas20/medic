"use server";

import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/type";
import { revalidatePath } from "next/cache";

export async function createAppointment(data:AppointmentProps){
    try {
        
        const newAppointment = await prismaClient.appointment.create({
            data
        })
        revalidatePath("/dashboard/doctor/appointments")
        console.log(newAppointment)
        return{
            data: newAppointment,
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

export async function updateAppointment(id:string, data:AppointmentProps){
    try {
    
        const updatedAppointment= await prismaClient.appointment.update({
            where:{
                id,
            },
            data
        })
        revalidatePath("/dashboard/doctor/appointments")
        console.log(updatedAppointment)
        return{
            data: updatedAppointment,
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


export async function getAppointments(){
    try {
        const appointments = await prismaClient.appointment.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })  
        console.log(appointments)
        return{
            data: appointments,
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



export async function getAppointmentById(id: string){
    try {
        if(id){
           const appointment =  await prismaClient.appointment.findUnique({
                where:{
                    id
                }
            })  
            return{
                data: appointment,
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


export async function deleteAppointment(id: string){
    try {
         await prismaClient.appointment.delete({
            where:{
                id
            }
        })  
        revalidatePath("/dashboard/doctor/appointments")  
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




