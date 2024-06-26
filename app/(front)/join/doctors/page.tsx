import CustomButton from '@/components/CustomButton'
import CustomAccordion, { FAQItem } from '@/components/frontend/CustomAccordion'
import Pricing from '@/components/frontend/Pricing'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { title } from 'process'
import React from 'react'

const page = () => {
    const faqs: FAQItem[] = [
        {
          qn: "What is Next.js?",
          ans: "Next.js is a React framework that enables server-side rendering and generating static websites for React based web applications."
        },
        {
          qn: "How do I install Next.js?",
          ans: "<p>You can install Next.js by running <code>npm install next react react-dom</code> or <code>yarn add next react react-dom</code>.</p>"
        },
        {
          qn: "What are the key features of Next.js?",
          ans: "<ul><li>Server-side rendering</li><li>Static site generation</li><li>API routes</li><li>Incremental static regeneration</li></ul>"
        },
        {
          qn: "How do I create a new Next.js project?",
          ans: "You can create a new Next.js project using the command <code>npx create-next-app@latest</code>."
        },
        {
          qn: "What is the difference between getStaticProps and getServerSideProps?",
          ans: "<p><strong>getStaticProps:</strong> Generates static HTML at build time. <br><strong>getServerSideProps:</strong> Generates HTML on each request.</p>"
        },
        {
          qn: "Can I use CSS in Next.js?",
          ans: "Yes, Next.js supports global CSS, CSS Modules, and even CSS-in-JS libraries like styled-components."
        }
      ];
    const features = [
        "Interact with patients online",
        "Take notes and prescribe drugs",
        "Have a face to face interaction with patients online",
    ];

    const cards =[
        {
            title:" Begin your journey",
             description:"Start a new application to join our network",
            image:"https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600",
            link: "/register?role=DOCTOR&plan=free",
            linkTitle:"Start Application"
        },
       
        {
            title:" Resume Application",
             description:"Complete your onboarding process",
            image:"https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600",
            link: "/onboarding/resume",
            linkTitle:"Continue your Application"
        },
        {
            title:" Schedule A Call",
             description:"Arrange time for a call to finalize your application",
            image:"https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600",
            link: "/",
            linkTitle:"Schedule a Call"
        },
        {
            title:"Track your Progress",
             description:"Start a new application to join our network",
            image:"https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600",
            link: "/",
            linkTitle:"Check Status"
        },
        
    ]
  return (
    <div className=' min-h-screen '>
         <section className='py-12 px-4'>
           <div className=' max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
             <div >
                <h2 className='md:text-4xl text-2xl leading-[3.5rem]'> Earn by easily onboarding Patients online</h2>
                <p className='py-4'>Sesame is a full-service platform to help you build and run your practice and care for patients for virtual care, in-person care, or both.</p>
                 <CustomButton
                    href='#'
                    title='List your service'
                    className="bg-yellow-600
                     hover:bg-yellow-800" 
                    />
                 <div className='py-6'>
                    {features.map((feature,i)=>{
                        return(
                           <p key ={1} className='flex items-center'>
                             <Check className='w-4 h-4 mr-2 flex-shrink-0 text-yellow-600' />
                             {feature}
                           </p> 
                        )
                    })}
                </div>   
             </div>
             <div >
                 <img
                   src='https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D' 
                       alt='' className='w-full'
                       style={{width:"100%",height:"100%",objectFit:"cover"}}     
                 />
             </div>
             
            </div> 
         </section>
         <section className='py-12 px-4'>
           <div className=' max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
           <div >
                 <img
                   src='https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lZGljYWx8ZW58MHx8MHx8fDA%3D' 
                       alt=''
                        className='w-full  hidden md:block'
                       style={{width:"100%",height:"90%",objectFit:"cover"}}
                 />
             </div>
             <div >
                <h2 className='md:text-4xl text-2xl leading-[3.5rem]'> Treat patients the way you want to treat them.</h2>
                <p className='py-4'>Sesame is a full-service platform to help you build and run your practice and care for patients for virtual care, in-person care, or both.</p>
                 {/* <CustomButton
                    href='#'
                    title='List your service'
                    className="bg-yellow-600
                     hover:bg-yellow-800" 
                    /> */}
                 {/* <div className='py-6'>
                    {steps.map((feature,i)=>{
                        return(
                           <p  key ={i} className='flex items-center'>
                             <Check className='w-4 h-4 mr-2 flex-shrink-0 text-yellow-600' />
                             {feature}
                           </p> 
                        )
                    })}
                </div>   */}
                <div className="grid grid-cols-2 gap-4">
                    {cards.map((card,i)=>{
                        return(
                            <div key={i} className="bg-yellow-600 p-3 rounded-lg shadow-2xl">
                            <h3 className='text-2xl font-semibold text-white'>
                                {card.title}
                            </h3>
                            <p className='text-white text-base'>
                                 {card.description}
                            </p>
                            <CustomButton
                            href={card.link}
                            title={card.linkTitle}
                            className="bg-yellow-800
                            hover:bg-yellow-900 text-xs " 
                           />
                        </div>
                        )
                    })}
                </div> 
             </div>
            </div> 
         </section>
         <section className='py-12 px-4'>
           <div className=' max-w-6xl mx-auto  gap-4'>
               <Pricing  />
            </div> 
         </section>
         <section className='py-12 px-4'>
           <div className=' max-w-6xl mx-auto  gap-4'>
               <CustomAccordion FAQS={faqs}  />
            </div> 
         </section>
        
    </div>
  )
}

export default page