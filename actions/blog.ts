"use server";

import { prismaClient } from "@/lib/db"
import { BlogsProp } from "@/types/type"
import { revalidatePath } from "next/cache";




export async function createBlog(data:BlogsProp){
    try {
        const existingBlog = await prismaClient.blog.findUnique({
            where:{
                slug:data.slug
            }
        })
        if (existingBlog){
            return{
                data: null,
                status: 409,
                error:"Blog already exists"
            }
        }
        const newBlog = await prismaClient.blog.create({
            data
        })
        revalidatePath("/dashboard/blog")
        console.log(newBlog)
        return{
            data: newBlog,
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


export async function updateBlog(id:string, data:BlogsProp){
    try {
        const existingBlog = await prismaClient.blog.findUnique({
            where:{
                id
            }
        })
        if (!existingBlog){
            return{
                data: null,
                status: 404,
                error:"Blog with id does not exist"
            }
        }
        const updatedBlog = await prismaClient.blog.update({
            where:{
                id,
            },
            data
        })
        revalidatePath("/dashboard/blog")
        console.log(updatedBlog)
        return{
            data: updatedBlog,
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


export async function getBlogs(){
    try {
        const blogs = await prismaClient.blog.findMany({
            orderBy:{
                createdAt: "desc"
            },
            select:{
                id:true,
                title:true,
                body:true,
                slug:true,
                imageUrl:true,
                createdAt:true,
                updatedAt:true,
            }
        })  
        console.log(blogs)
        return{
            data: blogs,
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


export async function getBlogBySlug(slug: string){
    try {
        if(slug){
           const blog =  await prismaClient.blog.findUnique({
                where:{
                    slug
                }
            })  
            return{
                data: blog,
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

export async function getBlogById(id: string){
    try {
        if(id){
           const blog =  await prismaClient.blog.findFirst({
                where:{
                    id
                }
            })  
            return{
                data: blog,
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


export async function deleteBlog(id: string){
    try {
         await prismaClient.blog.delete({
            where:{
                id
            }
        })  
        revalidatePath("/dashboard/blog")  
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
