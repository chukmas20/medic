import { File } from "@/components/FormInputs/MultipleFileUpload";
import { UserRole } from "@prisma/client";

export  type ServiceProps = {title: string; imageUrl:string; slug:string}

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
    middleName: any;
    dob: any;
    gender: string;
    page: string;
    userId: string  ;
    trackingNumber: string;
}

export type ProfileInfoFormProps ={
    page: string;
    bio: string;
    medicalLicense: string;
    medicalLicenseExpiry: any;
    profilePicture: string;
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
    boardCertificates: any;
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
    hourlyPay: number

}

export type AdditionalFormProps = {
    educationalHistory?: string;
    research?: string;
    accomplishments?: string;
    additionalDocs: any;
    page: string;

}

export type stats = {
    doctors: string;
    patients: string;
    appointments: string;
    services: string;
}

export type DoctorProfileAvailability = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[]; 
 }

export interface DoctorProfile {
   firstName: string;
   lastName: string;
   gender: string;
   bio: string | null;
   profilePicture: string | null;
   operationMode: string | null;
   hourlyWage: number;
   availability: DoctorProfileAvailability | null;
}

interface DoctorProfileDetail extends DoctorProfile{
    yearsOfExperience :number | null,     
    country:string | null,
    city:string | null,
    state :string | null,
    primarySpecialization:string | null,
    otherSpecialties :string[] | null,   
    hospitalName  :string | null,
    hospitalAddress :true,
    hospitalContactNumber   :string | null,
    hospitalEmailAddress    :string | null,
    hospitalWebsite         :string | null,
    hospitalHoursOfOperation :number | null,
    servicesOffered :string[] | null,
    insuranceAccepted  :string | null,
    languagesSpoken :string | null,

    educationalHistory :string | null,
    research :string | null,
    accomplishments :string | null,

}
export type Doctor = {
     id:string;
     name: string;
     email: string;
     phone: string;
     slug: string;
     doctorProfile: DoctorProfile | null;
 }

 export type DoctorDetail = {
    id:string;
    name: string;
    email: string;
    phone: string;
    slug: string;
    // doctorProfile: DoctorProfileDetail | null;
}




