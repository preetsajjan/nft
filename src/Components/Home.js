import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    const getData = async () => {
        const response = await fetch('http://127.0.0.1:8000/viewvalidatednft')

        setUser(await response.json());
    }

    useEffect(() => {
        auth()
        getData();
    }, []);

    const auth = async () => {
        const userId = await localStorage.getItem("id")
        if (!userId) {
            navigate("/")
        }
        // const userAuth = await localStorage.getItem("id")
        // console.log(userAuth)
    }

    return (
        <>
            <div class="text-center">
                <h1>Welcome to NFT Marketplace</h1>


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

                                </div></>
                            </center>
                            
                        )
                    })
                }

            </div>
        </>
    )
}

export default Home