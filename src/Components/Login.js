import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

// import { useEffect } from 'react';


function BasicExample() {
    // const [logindata, setLogindata] = useState([{ }])
    const navigate = useNavigate()

    const [user, setUser] = useState({
        id: "",
        password: ""
    })
    console.log(user)


    const getdata = (e) => {

        const { value, name } = e.target;
        setUser({

            ...user,
            [name]: value

        })
    }


    const handleClick = async (e) => {
        e.preventDefault();
        // console.log(user)
        // const { id, password } = user;

        // const getUserdata =localStorage.getItem("registered");
        // const userData =JSON.parse(getUserdata);
        // console.log(userData)
        if (!user.id) {
            alert(" id required")
        } else if (!user.password) {
            alert("password required")

        } else {
            await axios.post('http://127.0.0.1:8000/login',user).then(async(succ) => {
                // alert("Your id: " + succ.data['Public Id'])

                    if(succ.data===user.password && user.password==="admin" && succ.id ===0){
                        
                        navigate(`/admin`)
                        await localStorage.setItem("id",user.id)
                    }
                    else if(succ.data===user.password){
                        await localStorage.setItem("id",succ.data.public_id)
                        navigate(`/home`)
                        await localStorage.setItem("id",user.id)

                    }
                // localStorage.setItem("xxx",JSON.stringify([...data,succ.data]))
                // console.log(data)
            }).catch(err => {
                console.log(err)
            })

           
        }
    }

        // await axios.get("/login",user).then(succ => {
        //     console.log(succ.data)
        // // if(succ.data==="credential matched"){
        // //     alert("loggedin")
        // // }else{
        // //     alert("not matched")
        // // }

        // }).catch(err => {
        //     console.log(err)
        // })

        return (
            <>
                <div className='container'>
                    <h2>
                        Login
                    </h2>
                    <section>
                        <div className='right_data'>
                            <Form>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Control type="text" name="id" placeholder="Enter your id" onChange={getdata} />

                                </Form.Group>

                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                    <Form.Control name="password" type="password" placeholder="Password" onChange={getdata} />
                                </Form.Group>

                                <Button onClick={handleClick} variant="primary" type="submit">
                                    Submit
                                </Button>
                                <p className='mt-3'>Don't have an account? <NavLink to="/" >Signup</NavLink></p>

                            </Form>
                        </div>
                        <div>

                        </div>
                    </section>

                </div>
            </>

        );
    }

    export default BasicExample