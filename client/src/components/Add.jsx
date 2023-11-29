import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
const add = () => {
  
    const [person,setPerson]=useState({
    name:"",
    phonenumber:null,
    picture:"",
    description:"",

  })
const navigate=useNavigate()

  const handlechange=(e)=>{
    setPerson(preview=>({...preview,[e.target.name]:e.target.value}))
    
  }
const handleclick= ()=>{
    
    axios.post('http://localhost:8080/people', person)
      .then(function (response) {
        console.log(response);
        navigate('/')
      })
      .catch(function (error) {
        console.log(error);
      });
    
}


  
  
    return(
   <div className="form">
<h1 className="addbutton" onClick={()=>{navigate('/')}}>Add New Person</h1>
<input type="text" placeholder="name"onChange={handlechange} name="name"></input>
<input type="text" placeholder="description" onChange={handlechange} name="description" ></input>
<input type="number" placeholder="phonenumber" onChange={handlechange} name="phonenumber"></input>
<input type="text" placeholder="picture" onChange={handlechange} name="picture"></input>
  <button className="formButton" onClick={()=>handleclick()}>Add</button>
  </div>
)
};

export default add;
