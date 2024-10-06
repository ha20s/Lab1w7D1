import { useState , useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [info, setInfo] = useState([])
  const [showAdd , setShowAdd] = useState(false)
  const [searched, setSearched] = useState('')

  const [addChar , setAdd] = useState({
    name: '',
    image: '',
    gender: '',
  })

  useEffect(()=> {
    getInfo()
  }, [])

  const getInfo = () => {
    fetch('https://66e7e6a5b17821a9d9da6f39.mockapi.io/login')
  .then((response) => response.json())
  .then((json) => 
  setInfo(json) )
  }

  const postChar = () => {
    fetch('https://66e7e6a5b17821a9d9da6f39.mockapi.io/login', {
      method: 'POST',
      body: JSON.stringify({
        name: addChar.name,
        image: addChar.image,
        gender: addChar.gender,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setAdd({ name: '', image: '', gender: '' })
        setShowAdd(false) 
      });
  }



  const deleteChar= (id) => {
    fetch(`https://66e7e6a5b17821a9d9da6f39.mockapi.io/login/${id}`, {
      method: 'DELETE',
    })
    .then( res => {
      alert("You are deleting char now!!")
      setInfo(info.filter((item) => item.id !== id));
  })}

  const searchChar = (name) => {

  }


  return (
    <>

    <div className='p-10 bg-purple-100'>
      <div className='fle flex-col items-center mb-5'>
      <button
            className='border-2 border-blue-800 p-2 rounded mb-5'
            onClick={() => setShowAdd(!showAdd)}  > + </button>
            {showAdd? (
                      <div className='flex flex-col justify-center bg-pink-100 rounded p-5 mb-5'>
                      <p className='text-xl'> Enter the Characteers info </p>
                      <p>Enter Character name</p>
                      <input type="text" name="" id="" value={addChar.name} placeholder='Character Name'
                      onChange={(e)=> {setAdd({...addChar, name : e.target.value})}}/>
                      <p>Enter Character Image Link</p>
                      <input type="text" name="" id="" value={addChar.image}  placeholder='Character image'
                      onChange={(e)=> {setAdd({...addChar, image : e.target.value})}}/>
                      <p>Enter Character Gender</p>
                      <input type="text" name="" id=""  value={addChar.gender}  placeholder='Character gender'
                      onChange={(e)=> {setAdd({...addChar, gender : e.target.value})}}/>
             
                      <button className='p-2 border-2 border-blue-800 rounded mt-5' onClick={postChar}>Add</button>
                     </div>
            ) : (<div> </div>)

            }

<div className='flex flex-col gap-2 lg:flex-row'>
<input type="text" name="" id="" placeholder='serach' value={searched} className='p-2 rounded-2xl'
onChange={(e) => searchChar(e.target.value)} />

<button onClick={searchChar(searched)}>Search</button>
</div>

      </div>



      <div className='flex flex-wrap justify-around gap-5'>
      {info.map((item, index) => (
       <div key={index}>
         <p className='text-center text-xl font-bold '> Name: {item.name}</p>
         <img src={item.image} alt="" className='rounded-xl w-80 h-80 object-cover' /> 
         <p className=''>Gender: {item.gender}</p>
         <button className='p-2 border-2 rounded border-red-600 '  onClick={() => deleteChar(item.id)} >Delete character</button>
         <Link to="/update"><button className='p-2 border-2 rounded border-green-600 '
         onClick={() => localStorage.setItem('id' , item.id)}  >Update character</button></Link>
       </div>
      ))}

      </div>
    </div>
    </>
  )
}

export default App
