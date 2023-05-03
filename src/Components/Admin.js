import React from 'react'
import { useNavigate } from 'react-router';


const Admin = () => {
    const navigate = useNavigate()


const handleClick = async ()=>{
    navigate(`/validate`)

}
const handleClick2 = async ()=>{
    navigate(`/notvalidated`)
}
const handleClick3 = async ()=>{
    navigate(`/viewallnft`)
}

  return (
    <div className='container'>
        <h1>Admin Page</h1>
        <div className="mb-3 col-lg-6 mt-5">
                <button onClick={handleClick}>Validate NFT</button>
        </div>
        <div className="mb-3 col-lg-6 mt-5">
                <button   onClick={handleClick2} >VIEW Not validated NFT's</button>
        </div>
        <div className="mb-3 col-lg-6 mt-5">
                <button  onClick={handleClick3} >View all NFT</button>
        </div>

          
    </div>
  )
}

export default Admin
