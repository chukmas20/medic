"use server";

import WelcomeEmail from "@/components/Email/WelcomeEmail";
import { prismaClient } from "@/lib/db";
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

export async function createAvailability(data: any){
  try {    
  const newAvail = await prismaClient.availability.create({
    data
  });
  console.log(newAvail);

  return newAvail;
  } catch (error) {
      console.log(`Availability Create Error${error}`)
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

export async function updateAvailabilityById(id: string | undefined, data: any){
  if(id){
    try {
       const updatedAva = await prismaClient.availability.update({
           where:{
              id 
           },
           data,
       }) 
       console.log(updatedAva)
       return {
        data: updatedAva,
        status: 201,
        error: null
      }; 
    } catch (error) {
       console.log(error)
        return {
            data: null,
            status: 500,
            error: "Availability not updated"
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



export async function completeProfile(id: string | undefined, data: any){
  const resend = new Resend(process.env.RESEND_API_KEY);

  if(id){
    try {
       const existingProfile = await prismaClient.doctorProfile.findUnique({
           where:{
              id 
           },
       }) 
       if(!existingProfile){
        return {
          data: null,
          status: 404,
          error: "Profile not found"
        }
       }
       //send a welcome email
       const firstName = existingProfile.firstName;
       const email = existingProfile.email as string;
       const previewText = "Welcome onboard";
       const message =
       "Thank you for registering on Medic";
     const sendMail = await resend.emails.send({
       from: "Medical App <coparaeke@yahoo.com>",
       to: email,
       subject: "Welcome to Medic",
       react: WelcomeEmail({ firstName, previewText, message }),
     });
       const updateProfile = await prismaClient.doctorProfile.update({
        where:{
           id 
        },
        data,
    }) 
    console.log(updateProfile )  
    return {
      data: updateProfile,
      status:201,
      error:null
    }
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


export async function getDoctorById(id: string){
  if(id){
    try {
       const existingProfile = await prismaClient.doctorProfile.findUnique({
           where:{
               id
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


export async function getDoctorProfileById(userId: string | undefined ){
  if(userId){
    try {
       const profile = await prismaClient.doctorProfile.findUnique({
           where:{
              userId
           },
           include:{
            availability: true
           }
       }) 
       console.log(profile)
       return {
        data: profile,
        status: 200,
        error: null
      }; 
    } catch (error) {
       console.log(error)
        return {
            data: null,
            status: 500,
            error: "Profile was not found"
        }
    }
  }
}



