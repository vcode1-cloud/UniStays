import React from 'react'
import { useLocation } from 'react-router-dom'

const Hostel = () => {
  const location = useLocation()
  const hostels = location.state?.hostels || [] 

  return (
    <div className='mt-40'>
      {hostels.length === 0 ? (
        <p>No hostels found.</p>
      ) : (
        hostels.map((hostel, key) => (
          <div key={key} className="mb-6 m-4 p-4 border shadow-lg rounded-lg">
            <h1 className='text-2xl font-bold'>Hostel Name: {hostel.name}</h1>
            <h2 className='text-xl'>Location: {hostel.location}</h2>
            <p className='text-lg text-gray-600'>Description: {hostel.description}</p>
            <p className='text-lg text-gray-600'>Description: {hostel.price_per_person}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Hostel
