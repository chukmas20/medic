"use client"
import { Linkedin, Youtube } from "lucide-react"
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa"

export default function Footer (){

    const footerNavs = [
        {
            label: "Doctors",
            items: [
                {
                    href: '/join/doctors',
                    name: 'Register as A Doctor',
                },
                {
                    href: '/onboarding/resume',
                    name: 'Resume Application',

                },
            
                {
                    href: 'category?mode=TeleHealth%20visit',
                    name: 'Telehealth',
                },
                
                {
                    href: 'category?mode=In-person%20doctor%20visit',
                    name: 'In-person Visit',
                },
            ],
        },
        {
            label: "About",
            items: [
                {
                    href: 'javascript:void()',
                    name: 'Terms'
                },
                {
                    href: 'javascript:void()',
                    name: 'License'
                },
                {
                    href: 'javascript:void()',
                    name: 'Privacy'
                },
                {
                    href: '/about',
                    name: 'About US'
                },
            ]
        }, 
        {
            label: "Company",
            items: [
                {
                    href: 'javascript:void()',
                    name: 'Partners'
                },
                {
                    href: 'javascript:void()',
                    name: 'Team'
                },
                {
                    href: 'javascript:void()',
                    name: 'Careers'
                },
            ],
        }
    ]

    const socialLinks = [
        {
            title:"LinkedIn",
            href:"https://www.linkedin.com/",
            icon: Linkedin,
            color:"text-blue-600"

        },
        {
            title:"LinkedIn",
            href:"https://www.linkedin.com/",
            icon: FaYoutube,
            color:"text-red-600"

        },
        {
            title:"LinkedIn",
            href:"https://www.linkedin.com/",
            icon: FaFacebook ,
            color:"text-blue-600"

        },
        {
            title:"LinkedIn",
            href:"https://www.linkedin.com/",
            icon: FaTwitter,
            color:"text-blue-600"

        },
    ]

    return (
        <footer className="pt-10 bg-yellow-100">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="justify-between items-center gap-12 md:flex">
                    <div className="flex-1 max-w-lg">
                        <h3 className="text-2xl font-bold text-yellow-500">
                            Subscribe to our news letter.
                        </h3>
                    </div>
                    <div className="flex-1 mt-6 md:mt-0">
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-x-3 md:justify-end">
                            <div className="relative">
                                <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-yellow-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 active:shadow-none rounded-lg shadow">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
                 <img 
                    className=" md:w-38 md:h-28 "
                    src="https://utfs.io/f/9e828e54-7cd7-4bea-9f47-f2844c4fe763-1s9otp.png" 
                  />
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4 text-gray-600"
                                key={idx}
                            >
                                <h4 className="text-gray-800 font-semibold sm:pb-2 dark:text-gray-300">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={el.href}
                                                className="hover:text-gray-800 duration-150"

                                            >
                                                {el.name}
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p className="text-gray-600">© {new Date().getFullYear()} All rights reserved</p>
                    <div className="flex items-center gap-x-6 text-gray-400 mt-6">
                         {socialLinks.map((item,i)=>{
                            const Icon = item.icon
                            return(
                            <a key={i} href={item.href} target="_blank" className={item.color}>
                                <Icon className="w-6 h-6"  />
                            </a>
                            )
                         })}      
                    </div>
                </div>
            </div>
        </footer>
    )
}