import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css'
import Navbar from './Navbar';

function Add({valid,setValid}) {


  const [credentials1, setCredentials1] = useState({id:"", Name: "", doj:"", dol:"",mobile:""});
  let navigate1 = useNavigate();


  const handleSignup = async (e)=>{
    e.preventDefault();
    if(document.getElementById("id").value.length===0){
      window.alert("Employee Id cannot be left empty");
      return;
    }

    if(document.getElementById("Name").value.length<=2){
      window.alert("Name should be atleast of 3 characters");
      return;
    }
    if(document.getElementById("doj").value.length===0){
      window.alert("Date of joining cannot be left empty");
      return;
    }
    if(window.confirm("Are you sure the details entered are correct ? ")===false){
      return;
    }

    if(document.getElementById("mobile").value.length===0){
      window.alert("Mobile Number cannot be left empty");
      return;
    }

    if(document.getElementById("mobile").value.length!==10){
      window.alert("Mobile Number should be of 10 Digits");
      return;
    }
    
    const {id,Name,doj,dol,mobile} = credentials1;
    const response = await fetch("http://localhost:5000/addEmployee", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },

        body: JSON.stringify({id,Name,doj,dol,mobile})

    });
    const json = await response.json();
    if(json.status === 200){
        alert("Employee added!")
        navigate1('/');
        
    }
    else{
        alert("Entered Employee Id already exist ");
    } 
}

  const onChange1 = (e)=>{
    setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
  }

  return (
    <>
    <Navbar valid={valid} setValid={setValid}/>
    
      <div className='form'>
            <h1 id="overHeading">Add Employee</h1>
            <form onSubmit={handleSignup} className="mainForm">
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Employee Id *</label>
                    <input type="number" name="id" class="form-control" id="id" placeholder="Employee Id" onChange={onChange1}/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Name *</label>
                    <input type="text" name="Name" class="form-control" id="Name"  placeholder="Name" onChange={onChange1}/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName4">Date of Joining *</label>
                    <input type="date" name="doj" class="form-control" id="doj" placeholder="Employee Id" onChange={onChange1}/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Date of Leaving</label>
                    <input type="date" name="dol" class="form-control"  placeholder="Name" onChange={onChange1} disabled/>
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Mobile Number</label>
                    <input type="number" name="mobile" class="form-control" id="mobile"  placeholder="Mobile Number" onChange={onChange1} />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" >Add</button>
            </form>
        </div>

    </>
  )
}

export default Add