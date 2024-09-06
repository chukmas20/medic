"use server";

import { prismaClient } from "@/lib/db";
import {  PasswordChangeProps, PasswordResetProps } from "@/types/type";

import { Resend } from "resend";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import ResetPasswordEmail from "@/components/Email/ResetPasswordEmail";

   

export async function ForgotPasswordReset(formData: PasswordResetProps){
    const resend = new Resend(process.env.RESEND_API_KEY);

 try {
    const {email} = formData;
    const user = await await prismaClient.user.findUnique({
        where:{email}
    })

    if (!user) {
        throw new Error('User not found');
      }

      // Generate reset token and expiry
  const resetToken = crypto.randomBytes(32).toString('hex') ;
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Update user with reset token and expiry
    await prismaClient.user.update({
        where: {
             email 
            },
            data:{
                resetToken,
                resetTokenExpiry
            }
      });
      //Send an Email with the Token on the link as a search param
   
  let resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&id=${user.id}`;
  
  const linkText = resetLink;
  const name = user.name;
  const userId = user.id;
  console.log(linkText)
  console.log(name)
//   const redirectUrl = `reset-password?token=${resetToken}`
  const message =
  "Kindly click on the link below to reset your password :";
  const sendEmail = await resend.emails.send({
    from: "Medic App <coparaeke@yahoo.com>",
    to: email,
    subject: "Password Reset Request",
    react: ResetPasswordEmail({email,linkText, message, name, userId })
  }); 
  console.log(sendEmail)
 } catch (error) {
    throw new Error('Failed to send email');   
 }
  
}


export async function resetPassword(token: string, newPassword:PasswordChangeProps) {
    // Find user by reset token
     try {

        const user = await prismaClient.user.findFirst({
            where: {
              resetToken: token,
              resetTokenExpiry: {
                gt: new Date(), // Ensure the token has not expired
              },
            },
          });
        
          if (!user) {
            throw new Error('Invalid or expired token');
          }
        
          // Hash the new password
        //   let hashedPassword = await bcrypt.hash(newPassword, 10);
          const passwordToString = newPassword.toString()
          const passwordHash = await bcrypt.hash(passwordToString, 10);
          console.log(passwordHash)
          
        
          // Update user with the new password and remove the reset token
          await prismaClient.user.update({
            where: { id: user.id },
            data: {
              password: passwordHash ,
              resetToken: null,
              resetTokenExpiry: null,
            },
          });
        
          return { message: 'Password reset successfully' };
        
       } catch (error) {
        
     }
      
    }