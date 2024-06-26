"use client"
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
}

const initialData ={
    trackingNumber : "",
    doctorProfileId : "",
    setTrackingNumber: () => {},
    setDoctorProfileId: () => {},
}

const OnBoardingContext = createContext<IOnBoardingContextData>(initialData)

export function OnboardingContextProvider({children}:{children: ReactNode}){
    const [trackingNumber, setTrackingNumber] = useState("")
    const [doctorProfileId, setDoctorProfileId] = useState("")

    const contextValues ={
        trackingNumber,
         setTrackingNumber,
         doctorProfileId,
         setDoctorProfileId
      }

      return <OnBoardingContext.Provider value={contextValues}>
         {children}
      </OnBoardingContext.Provider>

}

export function useOnboardingContext(){
    return useContext(OnBoardingContext)
}
export default OnBoardingContext;