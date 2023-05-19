import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Viewallnft = () => {
    const [user, setUser] = useState([]);

    const getData = async () => {
        const response = await fetch('http://127.0.0.1:8000/viewvalidatednft')

        setUser(await response.json());
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div class="text-center">
                <h1>View All NFt's</h1>
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
                                                    <p class="card-text">IsValidated: {curElem.isValidate}</p>

                                                    <footer class="blockquote-footer">Public_Id: {curElem.public_id}</footer>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <h1>{curElem.block_id}</h1>
<h2>{curElem.index}</h2>
<h3>{ curElem.data }</h3>
<h5>{curElem.price}</h5>
<h4>{curElem.hash}</h4>
<h4>{curElem.prev_hash}</h4> */}


                                </>
                            </center>

                        )
                    })
                }
            </div>
        </>

    )
}

export default Viewallnft
