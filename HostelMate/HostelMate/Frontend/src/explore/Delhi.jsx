import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Delhi = () => {

  const [joke,setJoke]=useState([])

  useEffect(()=>{
    axios.get('/api/jokes')
    .then((resp)=>{
      setJoke(resp.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  })

  return (
    <div className='flex flex-col justify-center items-center mt-100'>
      <h3>HELLO JOKES ARE HERE:</h3>
      <p>JOKE:{joke.length}</p>
      {
        joke.map((joke)=>(
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Delhi