"use server";

import { prismaClient } from "@/lib/db";
import { BioDataFormProps } from "@/types/type";
import {Resend} from "resend";

export async function createDoctorProfile(formData: any){
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
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
    return newProfile
     
    } catch (error) {
        console.log(error)
        return {
            error: "Something went wrong"
        }
    }
}





