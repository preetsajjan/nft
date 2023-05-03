import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Viewallnft = () => {
    const [user,setUser] = useState([]);

    const getData = async ()=>{
        const response = await fetch('http://127.0.0.1:8000/viewvalidatednft')
        
        setUser(await response.json());
    } 

    useEffect(()=>{
        getData();
    },[]);


  return (
    <>
    <div>
      <h1>View All NFt's</h1>
      </div>
      <div>
      {
            user.map((curElem) => {
                return (
                    <>
                    <h2>{curElem.index}</h2>
                    <h3>{ curElem.data }</h3>
                    <h5>{curElem.price}</h5>
                    <h4>{curElem.hash}</h4>
                    <h4>{curElem.prev_hash}</h4>


                    </>
                )
            })
        }
      </div>
    </>
    
  )
}

export default Viewallnft