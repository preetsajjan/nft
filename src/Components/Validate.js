import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Validate = () => {

    const [user, setUser] = useState({
        index:""
    })
    console.log(user)

    const getdata = (e) => {

        const { value, name } = e.target;
        setUser({

            ...user,
            [name]: value

        })

    }

    const handleClick=async(e)=>{
        e.preventDefault();
        const { index } = user;
        if(!index){
            alert("Enter Index numner of nft")
        }else{
            await axios.post('http://127.0.0.1:8000/validatenft',user).then(succ =>{
                console.log(succ.data)
                alert("block validated succesfully")
            }).catch(err =>{
                console.log(err)
            })
        }

    }

  return (
    <center>
 <>
    <div class="container mt-5 text-center  " >
      <h1>Validate NFT</h1>
    </div>
    <div class=" mt-5 col-4 text-center">
    <input class="form-control" type="text" placeholder="Enter index Number" name="index" onChange={getdata}/>

    </div>
    <div class="mt-5 text-center">
    <button type="button" class="btn btn-secondary" onClick={handleClick} >VALIDATE NFT</button>

    </div>
    </>
    </center>
   
    
  )
}

export default Validate
