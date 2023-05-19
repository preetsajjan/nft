import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Viewmynft() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    const [i, seti] = useState("")
    const getData = async () => {

        const index = await localStorage.getItem("id")
        const response = await fetch("http://127.0.0.1:8000/mynft")
        seti(index)

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
                <h1>View My Nft</h1>

            </div>

            <div>
                {
                    user.map((curElem) => {
                        { }
                        return (
                            <center>
  <div>
                                {curElem.public_id == i && <div>

                                    <div class="container">
                                        <div class="col-6">
                                            <div class="card mt-5">
                                                <h5 class="card-header">NFT</h5>
                                                <div class="card-body">
                                                    <h5 class="card-title">Data: {curElem.data}</h5>
                                                    <p class="card-text">Price: {curElem.price}</p>
                                                    <footer class="blockquote-footer">Public_Id: {curElem.public_id}</footer>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>}

                            </div>
                            </center>

                          





                            // <>
                            // <p>
                            // </p>
                            //     <h2>{curElem.public_id == i && <p>Hello</p>}</h2>
                            //     {/* <h2>{curElem.index}</h2>
                            //     <h3>{curElem.data}</h3>
                            //     <h5>{curElem.price}</h5>
                            //     <h4>{curElem.hash}</h4>
                            //     <h4>{curElem.prev_hash}</h4> */}


                            // </>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Viewmynft