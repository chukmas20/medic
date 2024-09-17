"use server";

import EmailTemplate from "@/components/Email/EmailTemplate";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db";
import { DoctorDetail, RegisterInputProps, UserProfile } from "@/types/type";
import generateSlug from "@/utils/generateSlug";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import {Resend} from "resend";

export async function createUser(formData: RegisterInputProps){
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {firstName,lastName,email, phone, role, password,plan } = formData;
    // console.log(data)
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
              email,
            },
          });
          if (existingUser) {
            return {
              data: null,
              error: `User with this email ( ${email})  already exists in the Database`,
              status: 409,
            };
          }
          // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      data: {
        name:lastName + " " +" " + firstName,
        slug: generateSlug(`${lastName} ${firstName}`),
        email,
        phone,
        password: hashedPassword,
        token: userToken,
        role,
        plan
      },
    });
    //Send an Email with the Token on the link as a search param
    const token = newUser.token;
    const userId = newUser.id;
    const name = newUser.name.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
    "Thank you for registering with Medic. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
  const sendMail = await resend.emails.send({
    from: "Medical App <coparaeke@yahoo.com>",
    to: email,
    subject: "Verify Your Email Address",
    react: EmailTemplate({ name, token, linkText, message }),
  });
  console.log(token);
  console.log(sendMail);
  console.log(newUser);
     return {
        data: newUser,
        error: null,
        status: 200
     };
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }
}

export async function getUserById(id: string){
  if(id){
    try {
       const user = await prismaClient.user.findUnique({
           where:{
               id
           }
       })
       return user
    } catch (error) {
       console.log(error)
    }
  }
}

export async function updateUserById(id: string){
   if(id){
     try {
        const updatedUser = await prismaClient.user.update({
            where:{
               id 
            },
            data:{
                isVerfied: true
            }
        }) 
        return updatedUser
     } catch (error) {
        console.log(error);
     }
   }
}

export async function getDoctors() {
   try {
    const doctors = await prismaClient.user.findMany({
      where:{
        role: "DOCTOR"
      },
      
     select:{
      id:true,
      name:true,
      email:true,
      slug: true,
      phone: true,
    
      doctorProfile:{
        select:{
          id:true,
          firstName: true,
          lastName: true,
          gender: true,
          bio: true,
          profilePicture: true,
          operationMode: true,
          hourlyWage: true,
          status: true,
          dob:true,
          middleName:true,
          hospitalAddress:true,
         
          availability:{
             select:{
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: true,
              sunday: true,
             }
          }
         }

      }
     }
    })
    return doctors
   } catch (error) {
     console.log(error)
     return null
   }
}

export async function getDoctorBySlug(slug:string){
   if(slug){
    try {
      const doctor = await prismaClient.user.findFirst({
        where:{
          role: "DOCTOR",
          slug
        },
        
       select:{
        id:true,
        name:true,
        email:true,
        slug: true,
        phone: true,
      
        doctorProfile:{
          select:{
            id:true,
            firstName: true,
            lastName: true,
            gender: true,
            bio: true,
            profilePicture: true,
            operationMode: true,
            hourlyWage: true,
            yearsOfExperience : true,
      
         
            country: true,
            city: true,
            state : true,
            primarySpecialization: true,
            otherSpecialties : true,   
            hospitalName  : true,
            hospitalAddress :true,
            hospitalContactNumber   : true,
            hospitalEmailAddress    : true,
            hospitalWebsite         : true,
            hospitalHoursOfOperation : true,
            servicesOffered : true,
            insuranceAccepted  : true,
            languagesSpoken : true,
        
            educationalHistory : true,
            research : true,
            accomplishments : true,
           
  
            availability:{
               select:{
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
               }
            }
           }
  
        }
       }
      });
      if(!doctor){
        return null;
      }
      return doctor
     } catch (error) {
       console.log(error)
       return null
     }
   }
}

export async function getDoctorById(id:string){
  if(id){
   try {
     const doctor = await prismaClient.user.findFirst({
       where:{
         role: "DOCTOR",
         id
       },
       
      select:{
       id:true,
       name:true,
       email:true,
       slug: true,
       phone: true,
     
       doctorProfile:{
         select:{
           id:true,
           firstName: true,
           lastName: true,
           gender: true,
           bio: true,
           profilePicture: true,
           operationMode: true,
           hourlyWage: true,
           yearsOfExperience : true,
           dob:true,
           middleName:true,
           status: true,
           medicalLicenseExpiry:true,
           medicalLicense:true,
           medicalSchool:true,
           graduationYear:true,
           boardCertificates:true,
     
        
           country: true,
           city: true,
           state : true,
           primarySpecialization: true,
           otherSpecialties : true,   
           hospitalName  : true,
           hospitalAddress :true,
           hospitalContactNumber   : true,
           hospitalEmailAddress    : true,
           hospitalWebsite         : true,
           hospitalHoursOfOperation : true,
           servicesOffered : true,
           insuranceAccepted  : true,
           languagesSpoken : true,
       
           educationalHistory : true,
           research : true,
           accomplishments : true,
 
           availability:{
              select:{
               monday: true,
               tuesday: true,
               wednesday: true,
               thursday: true,
               friday: true,
               saturday: true,
               sunday: true,
              }
           }
          }
 
       }
      }
     });
     if(!doctor){
       return null;
     }
     return doctor
    } catch (error) {
      console.log(error)
      return null
    }
  }
}


export async function getLoggedInUserId(id: string){
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('No user logged in');
  }
  
    try {
       const user = await prismaClient.user.findUnique({
           where:{
            id: session.user.id,
           }
       })
       return user
    } catch (error) {
       console.log(error)
    }
  
}


export async function updateLoggedInUser(data: UserProfile){
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('No user logged in');
  }
    try {
      // Update the user profile in the database
       const updatedUser = await prismaClient.user.update({
       where: {
        id: session.user.id,
       },
      data,
   });

  return updatedUser;
    } catch (error) {
       console.log(error)
    }
  
}


