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
    <center>
         <div className='container'>
        <h1>Admin Page</h1>
        <div className="mb-3 col-lg-6 mt-5">
                <button class="btn btn-primary" onClick={handleClick}>   Validate NFT</button>
        </div>
        <div className="mb-3 col-lg-6 mt-5">
                <button  class="btn btn-primary" onClick={handleClick2} >View alltransactions</button>
        </div>
        <div className="mb-3 col-lg-6 mt-5">
                <button class="btn btn-primary" onClick={handleClick3} >View all NFT</button>
        </div>

          
    </div>
    </center>
   
  )
}

export default Admin
