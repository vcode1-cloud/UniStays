import { AI_prompt, generateGeminiContent } from '../service/AIModal'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Explore = ({city}) => {

    const city_names=[
        "Delhi",
        "Banglore",
        "Pune"
    ]

    const [place, setPlace]= useState()
    const [formData, setFormData]= useState()
    const [openDialogue,setOpenDialogue]=useState(false)

    const handleInputChange=(name,value)=>{
        setFormData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(formData)
    },[formData])

    const OnSearch = async () => {
        const user=localStorage.getItem("user")

        if(!user){
            setOpenDialogue(true)
            return;
        }

        if(!formData?.location){
            toast("Enter Location to Search")
            return;
        }
        const FINAL_PROMPT=AI_prompt.replace("{location}",formData?.location.label)
        console.log(FINAL_PROMPT)
        const res=await generateGeminiContent(FINAL_PROMPT)
        console.log(res)
    }

    const login=useGoogleLogin({
        onSuccess:(res)=>getUserProfile(res),
        onError:(err)=>console.log(err)
    })

    const getUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((resp)=>{
            console.log(resp)
            localStorage.setItem('user',JSON.stringify(resp.data))
            setOpenDialogue(false)
            OnSearch()
        })
    }

  return (
    <div className='flex w-full h-200 m-10'>
    <div className='flex flex-col md:w-200 md:h-75 h-100 w-full shadow-sm bg-gray-50 rounded-lg shadow-black'>
        <div className='flex items-center mt-3'>
            <div className='w-full relative p-4 m-5 md:mx-10 rounded-lg bg-white shadow-sm shadow-gray-300 flex flex-col md:flex md:justify-between'>
            <div className='flex flex-col md:w-[80%] w-full'>
                <h1 className='text-medium text-lg'>Find in and around...</h1>
                <GooglePlacesAutocomplete 
                    placeholder='Search Location'
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(v)=>{setPlace(v); handleInputChange('location',v)},
                        
                    }}
                />
            </div>
                <button onClick={OnSearch} className='bg-[#60C3AD] md:absolute md:right-2 md:top-3 md:w-[15%] text-white p-3 mt-3 rounded-lg hover:bg-teal-600 duration-300'>
                    Search
                </button>
            </div>
        </div>
        <h1 className=' ml-5 font-semibold text-lg'>🏢 Popular Cities ...</h1>
      <div className='flex w-full justify-center md:gap-7 md:-mt-5'>
            {city.map((src,index)=>(
                <Link key={index} to={`/${city_names[index].toLocaleLowerCase()}`}>
                <div className='flex p-5 rounded-2xl hover:scale-105 hover:bg-teal-100 duration-300 cursor-pointer' key={index}> 
                            <figure className=''>
                                <img className='md:h-18 h-17 object-contain' src={src} alt={city_names[index]}/>
                                <figcaption className='text-center text-medium'>{city_names[index]}</figcaption>
                            </figure>
                </div>
                </Link>
            ))}
      </div>



    </div>
        {/* <!-- Main modal --> */}
        {openDialogue && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="relative top-50 p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="bg-white border-1 shadow-lg shadow-black relative rounded-lg">
                {/* Modal header */}
                <div className="flex justify-between">
                    <img className="md:ml-60" src="./img/HM.png" width={150} alt="" />
                    <button
                        onClick={() => setOpenDialogue(false)}
                        className="m-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                {/* Modal body */}
                <div className="">
                    <h2 className='text-2xl font-bold text-center'>Sign-in with Google</h2>
                    <p className='text-xl font-medium text-center mt-2'>Sign-in to the app with <span className='text-[#60C3AD]'>Google Authentication</span> securely</p>
                </div>

                {/* Modal footer */}
                <div className="flex justify-center p-4 md:p-5">
                <button
                    onClick={()=>login()}
                    className="flex hover:bg-gray-900 gap-2 items-center justify-center text-white w-[90%] bg-black px-5 py-2.5 rounded-lg"
                >
                    <FcGoogle className='h-7 w-7' />Sign in with Google
                </button>
                </div>
            </div>
            </div>
        </div>
        )}

    </div>
  )
}

export default Explore
