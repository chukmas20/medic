"use client"
import { AdditionalFormProps, BioDataFormProps, ContactInfoFormProps, EducationFormProps, PractiseFormProps, ProfileInfoFormProps } from "@/types/type";
//context =>  UseState at a global level
import { ReactNode, createContext, useContext, useState,  } from "react";

//Steps for  creating context API

//Define the shape of the data you want to track
//Define the initial data
//create and export the context
//Add the types to the context and initialData

interface IOnBoardingContextData{
    trackingNumber: string;
    setTrackingNumber: (value: string) => void
    setDoctorProfileId: (value: string) => void
    doctorProfileId: string;   

    //Track the form database_url
    bioData: BioDataFormProps
    setBioData: (data: BioDataFormProps)=> void

    profileData: ProfileInfoFormProps
    setProfileData: (data: ProfileInfoFormProps) =>void

    contactData: ContactInfoFormProps
    setContactData: (data: ContactInfoFormProps) =>void

    educationData: EducationFormProps
    setEducationData: (data: EducationFormProps) =>void

    practiseData: PractiseFormProps
    setPractiseData: (data: PractiseFormProps) =>void

    additionalData: AdditionalFormProps
    setAdditionalData: (data: AdditionalFormProps) => void

    savedDbData: any;
    setSavedDbData:(data: any) => void;

}

const initialBioData = {
    firstName:"",
    lastName:"",
    middleName:"",
    dob:"",
    gender:"",
    page:"",
    userId:"",
    trackingNumber: ""

}

const initialProfileData = {
    page: "",
    bio: "",
    medicalLicense: "",
    medicalLicenseExpiry: "",
    profilePicture: "",
    yearsOfExperience: 0,

}

const initialContactData = {
    page: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
}

const initialEducationData = {
    medicalSchool: "",
    graduationYear: 0,
    primarySpecialization: "",
    otherSpecialties: [],
    boardCertificates: [],
    page: ""
}

const initialPractiseData = {
    page: "",
    hospitalName: "",
    hospitalAddress: "",
    hospitalContactNumber: "",
    hospitalEmailAddress: "",
    hospitalWebsite:"",
    hospitalHoursOfOperation: 0,
    servicesOffered: [],
    insuranceAccepted: "",
    languagesSpoken: [],

}

const initialAdditionalData = {
    educationalHistory: "",
    research: "",
    accomplishments: "",
    additionalDocs: [],
    page: ""
}

const initialContextData ={
    trackingNumber : "",
    doctorProfileId : "",
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
    setBioData: () => {},
    setProfileData: () => {},
    setContactData: () => {},
    setEducationData: () => {},
    setPractiseData: () => {},
    setAdditionalData: () => {},
    savedDbData: {},
    setSavedDbData:() => {},

    bioData: initialBioData,
    profileData:initialProfileData,
    contactData:initialContactData,
    educationData:initialEducationData,
    practiseData:initialPractiseData,
    additionalData: initialAdditionalData,
    
    
}

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData )
export function OnboardingContextProvider({children}:{children: ReactNode}){
    const [trackingNumber, setTrackingNumber] = useState<string>("")
    const [doctorProfileId, setDoctorProfileId] = useState<string>("")
    const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData)
    const [profileData, setProfileData] = useState<ProfileInfoFormProps>(initialProfileData)
    const [contactData, setContactData] = useState<ContactInfoFormProps>(initialContactData)
    const [educationData, setEducationData] = useState<EducationFormProps>(initialEducationData)
    const [practiseData, setPractiseData] = useState<PractiseFormProps>(initialPractiseData)
    const [additionalData, setAdditionalData] = useState<AdditionalFormProps>(initialAdditionalData)
    const [savedDbData, setSavedDbData] = useState<any>({})



    const contextValues ={
        trackingNumber,
         setTrackingNumber,
         doctorProfileId,
         setDoctorProfileId,
         bioData,
         setBioData,
         profileData,
         setProfileData,
         contactData,
         setContactData,
         educationData,
         setEducationData,
         practiseData,
         setPractiseData,
         additionalData,
         setAdditionalData,
         savedDbData, 
         setSavedDbData
      }

      return <OnBoardingContext.Provider value={contextValues}>
         {children}
      </OnBoardingContext.Provider>

}

export function useOnboardingContext(){
    return useContext(OnBoardingContext)
}
export default OnBoardingContext;