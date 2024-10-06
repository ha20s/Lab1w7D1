import React from 'react'
import { useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Update() {
    const navigate = useNavigate()
    const [updated , setUpdated] = useState('')
    const id = localStorage.getItem('id');

    const UpdateChar = (id) => {
        fetch(`https://66e7e6a5b17821a9d9da6f39.mockapi.io/login/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                image: updated, 
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then(() => { navigate("/")})

    }
  
  return (
    <div className='p-2'>
 <input  className='border-2'  type="text"  value={updated}  onChange={(e) => setUpdated(e.target.value)}  placeholder="Enter image Url"
            />
        <button  onClick={() => UpdateChar(id)}  className='border-2 p-2 ml-2'>Update</button>
        </div>
  )
}

export default Update