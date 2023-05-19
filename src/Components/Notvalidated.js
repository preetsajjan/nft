import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Notvalidated = () => {
    const [user,setUser] = useState([]);

    const getData = async ()=>{
        const response = await fetch('http://127.0.0.1:8000/alltransactions')
        
        setUser(await response.json());
    } 

    useEffect(()=>{
        getData();
    },[]);

  return (
    <>
    <div class="text-center mt-5">
      <h1>View All Transactions</h1>
    </div>
    <div>
    {
            user.map((curElem) => {
                return (
                <center>
                     <>
                                <div class="container">
                                    <div class="col-6">
                                        <div class="card mt-5">
                                            <h5 class="card-header">NFT</h5>
                                            <div class="card-body">
                                                <h5 class="card-title">Data: {curElem.data}</h5>
                                                <p class="card-text">Price: {curElem.price}</p>
                                                <p class="card-text">IsValidate: {curElem.isValidate}</p>

                                                <footer class="blockquote-footer">Public_Id: {curElem.public_id}</footer>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </>
                </center>
                )
            })
        }
    </div>
    </>
    
  )
}

export default Notvalidated
