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

export type BioDataFormProps ={
    firstName: string;
    lastName: string;
    middleName?: string;
    dob?: Date;
    gender: string;
    page: string;
    userId?: string | undefined;
    trackingNumber?: string;
}

export type ProfileInfoFormProps ={
    page: string;
    bio: string;
    medicalLicense: string;
    medicalLicenseExpiry?: Date;
    profilePicture?: string;
    yearsOfExperience: number;

}

export type ContactInfoFormProps ={
    page: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
}

export type EducationFormProps = {
    medicalSchool: string;
    graduationYear: number;
    primarySpecialization?: string;
    otherSpecialties?: string[];
    boardCertificates: string[];
    page: string;
}


export type PractiseFormProps = {
    page: string;
    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite?:string;
    hospitalHoursOfOperation: number;
    servicesOffered: string[];
    insuranceAccepted?: string;
    languagesSpoken: string[];

}

export type AdditionalFormProps = {
    educationalHistory?: string;
    research?: string;
    accomplishments?: string;
    additionalDocs: string[];
    page: string;

}



