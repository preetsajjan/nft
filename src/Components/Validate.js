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

    const handleClick=(e)=>{
        e.preventDefault();
        const { index } = user;
        if(!index){
            alert("Enter Index numner of nft")
        }else{
            axios.post('http://127.0.0.1:8000/validatenft',user).then(succ =>{
                console.log(succ.data)
                alert("block validated succesfully")
            }).catch(err =>{
                console.log(err)
            })
        }

    }

  return (
    <>
    <div>
      <h1>Validate NFT</h1>
    </div>
    <div>
    <input class="form-control" type="text" placeholder="Enter index Number" name="index" onChange={getdata}/>

    </div>
    <div>
    <button type="button" class="btn btn-secondary" onClick={handleClick} >VALIDATE NFT</button>

    </div>
    </>
    
  )
}

export default Validate
