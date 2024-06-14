import { UserRole } from "@prisma/client";

export  type ServiceProps = {title: string, image:string, slug:string}

export type RegisterInputProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: any;
    plan: any;
}

export type LoginInputProps = { 
    email: string;
    password: string;  
}

