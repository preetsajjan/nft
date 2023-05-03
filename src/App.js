import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
   BrowserRouter,
   Routes,
   Route
 } from "react-router-dom";


import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Addblock from "./Components/Addblock";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Validate from "./Components/Validate";
import Notvalidated from "./Components/Notvalidated";
import Viewallnft from "./Components/Viewallnft";
import Viewmynft from "./Components/Viewmynft";


 function App(){
    return (
      <>
          <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addblock" element={<Addblock/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
        <Route exact path="/validate" element={<Validate/>}/>
        <Route exact path="/notvalidated" element={<Notvalidated/>}/>
        <Route exact path="/viewallnft" element={<Viewallnft/>}/>
        <Route exact path="/viewmynft" element={<Viewmynft/>}/>




        
        </Routes>
    </BrowserRouter>
    </>
  )
    
 }
 export default App