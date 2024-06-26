"use server";

import { prismaClient } from "@/lib/db";
import { BioDataFormProps } from "@/types/type";
import {Resend} from "resend";

export async function createDoctorProfile(formData: any){
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
        dob,
        firstName,
        gender,
        lastName,
        middleName,
        page,
       trackingNumber,
       userId
     } = formData;
    // console.log(data)
    try {    
    const newProfile = await prismaClient.doctorProfile.create({
      data: {
        dob,
        firstName,
        gender,
        lastName,
        middleName,
        page,
       trackingNumber,
       userId
      },
    });
    console.log(newProfile);
    return {
      data: newProfile,
      status: 201,
      error: null
    }; 
    } catch (error) {
        console.log(error)
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        }
    }
}

export async function updateDoctorProfile(id: string | undefined, data: any){
  if(id){
    try {
       const updateProfile = await prismaClient.doctorProfile.update({
           where:{
              id 
           },
           data,
       }) 
       console.log(updateProfile )
       return {
        data: updateProfile,
        status: 201,
        error: null
      }; 
    } catch (error) {
       console.log(error)
        return {
            data: null,
            status: 500,
            error: "Profile Update Failed"
        }
    }
  }
}

export async function getApplicationByTrack(trackingNumber: string){
  if(trackingNumber){
    try {
       const existingProfile = await prismaClient.doctorProfile.findUnique({
           where:{
               trackingNumber
           }
       })
       if(!existingProfile){
        return {
          data: null,
          status: 404,
          error: "Code does not exist"
        }; 
       }
       return {
        data: existingProfile,
        status: 200,
        error: null
      }; 
       
    } catch (error) {
       console.log(error)
       return {
        data: null,
        status: 500,
        error: " Something Went Wrong"
    }
    }
  }
}



