import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function BasicExample() {

    const [user, setUser] = useState({
        data: "",
        
        price: ""
    })
    console.log(user)

    const getdata = async (e) => {

        const { value, name } = e.target;
            const index = await localStorage.getItem("id")
        setUser({

            ...user,
            [name]: value, ['id']:index

        })
        console.log(user)

    }
    const handleClick = async (e)=>{
        e.preventDefault();
       
        const { data,id, price } = user;
        if (!data) {
            alert(" name required")
        } else if(!id){
            alert("id req")
        }
        else if (!price) {
            alert("password required and length should be greater than 5")

        } else {
            await axios.post('http://127.0.0.1:8000/addblock', user).then(succ => {
                alert("block added succesfully")
                // window.location.reload()
                // localStorage.setItem("xxx",JSON.stringify([...data,succ.data]))
                // console.log(data)
            }).catch(err => {
                console.log(err)
            })

           

        }
    }


    return (
        <>
        <div className='container'>
           <div className='mb-3 col-lg-6 mt-5 '>
      <h2 className='mb-3 col-lg-6 mt-5'>ADD BLOCK</h2> 
      <input class="form-control" type="text" placeholder="Enter Shayari" name="data" onChange={getdata}/>

    </div> 
    {/* <div className='mb-3 col-lg-6 '>
    <input class="form-control" type="number" placeholder="Enter id" name="id" onChange={getdata}/>

    </div> */}
    <div className='mb-3 col-lg-6 '>
    <input class="form-control" type="number" placeholder="Enter price" name="price" onChange={getdata}/>

    </div>
    <div className='mb-3 col-lg-6 mt-5'>

    <button type="button" class="btn btn-secondary" onClick={handleClick} >Add NFT</button>
    </div> 
    </div>
        </>

    )
}

export default BasicExample;