import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Link } from 'react-router-dom'

const Explore = ({city}) => {

    const city_names=[
        "Delhi",
        "Banglore",
        "Pune"
    ]

    const [place, setPlace]= useState()
    const [formData, setFormData]= useState()

    const handleInputChange=(name,value)=>{
        setFormData({
            ...formData,
            [name]:value
        })
    }

    useEffect(()=>{
        console.log(formData)
    },[formData])

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
                <button className='bg-[#60C3AD] md:absolute md:right-2 md:top-3 md:w-[15%] text-white p-3 mt-3 rounded-lg hover:bg-teal-600 duration-300'>
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
                                <img className='md:h-18 h-17 object-contain' src={src} alt={city_names[index]} />
                                <figcaption className='text-center text-medium'>{city_names[index]}</figcaption>
                            </figure>
                </div>
                </Link>
            ))}
      </div>
    </div>
    </div>
  )
}

export default Explore
