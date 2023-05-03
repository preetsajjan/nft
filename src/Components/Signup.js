import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
// import { Container } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
// import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';



function BasicExample() {
    const [user, setUser] = useState({
        name: "",
        password: ""
    })
    console.log(user)

    // const [data, setData] = useState([]);

    // const navigate = useNavigate()

    const getdata = (e) => {

        const { value, name } = e.target;
        setUser({

            ...user,
            [name]: value

        })

    }

    const handleClick = async (e) => {
        e.preventDefault();
        const { name, password } = user;
        // console.log(user);
        if (!name) {
            alert(" name required")
        } else if (!password || password.length < 5) {
            alert("password required and length should be greater than 5")

        } else {
            fetchInfo()

           

        }
    }
    const fetchInfo =()=>{
        
        axios.post('http://127.0.0.1:8000/signup', user).then(succ => {
                alert("Your id: " + succ.data['Public Id'])
                // localStorage.setItem("xxx",JSON.stringify([...data,succ.data]))
                // console.log(data)
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {/* <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">User Registration</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">User Login</Nav.Link>
                        <Nav.Link href="#features">Add Block</Nav.Link>
                        <Nav.Link href="#pricing">View My nft</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}
            <div className='container'>
                <h2 className='mt-5'>
                    Signup
                </h2>
                <section>
                    <div className='right_data mt-5'>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter your name" onChange={getdata} name="name" />

                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={getdata} name="password" />
                            </Form.Group>

                            <Button onClick={handleClick} variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                        <p className='mt-3'>Already have an account <span><NavLink to="/login" >Login</NavLink></span></p>

                    </div>

                </section>

            </div>
        </>

    );
}

export default BasicExample;