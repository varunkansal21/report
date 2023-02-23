import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css'
import Navbar from './Navbar';
import moment from 'moment/moment';


function Add({valid,setValid}) {

  const [credentials2, setCredentials2] = useState({id:""});
  const [credentials1, setCredentials1] = useState({ Name: "", doj:"", dol:""});
  let navigate1 = useNavigate();


  const handleSignup = async (e)=>{
    e.preventDefault();
    if(window.confirm("Are you sure the details updated are correct ? ")===false){
        return;
      }
    const {id}= credentials2;

    const  Name=document.getElementById("name").value;
    const doj=document.getElementById("doj").value;
    const dol=document.getElementById("dol").value;
    const response = await fetch("http://localhost:5000/updateEmployee", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },

        body: JSON.stringify({id,Name,doj,dol})

    });
    const json = await response.json();
    if(json.status === 200){
        alert("Employee Updated!")
        navigate1('/');
        
    }
    else{
        alert("Please enter all the details correctly");
    } 
}

var [users,setUsers] = useState([]);
    
    const handleFetch = async (e)=>{
        e.preventDefault();
        console.log("hello");
        const {id} = credentials2;
        const response = await fetch("http://localhost:5000/employeeData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },

            body: JSON.stringify({id})

        });
        users = await response.json();
        setUsers(users);
        document.getElementById("id").value=users[0].ID;
        document.getElementById("name").value=users[0].NAME;
        
        var date= moment(users[0].DOJ);
        
        var today=date._d;
        var month=today.getMonth()+1;
        
        if(String(month).length===1){  
            month="0"+month;
            
        }
        var nowDate=today.getDate();
        if(String(nowDate).length===1){
            nowDate="0"+nowDate;
        }
        date=today.getFullYear()+"-"+(month)+"-"+nowDate;

        document.getElementById("doj").value=date;
        if(users[0].DOL===null){
            document.getElementById("dol").value=null; 
        }
        else{
            var date1= moment(users[0].DOL);
        
            var today1=date1._d;
            var month1=today1.getMonth()+1;
            if(String(month1).length===1){
                
                month1="0"+month1;
                
            }
            var nowDate1=today1.getDate();
            if(String(nowDate1).length===1){
                nowDate1="0"+nowDate1;
            }
            date1=today1.getFullYear()+"-"+(month1)+"-"+nowDate1;
            // console.log(date1);
            document.getElementById("dol").value=date1;
            document.getElementById("dol").disabled=true;
            document.getElementById("update").disabled=true;
        }
        document.getElementById("id").disabled=true;
    }
    

const onChange1 = (e)=>{
    setCredentials1({...credentials1, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
}       
  
const onChange2 = (e)=>{
    setCredentials2({...credentials2, [e.target.name]: e.target.value}); // This took 2 hours. Don't put [] over e.target.value.
} 

  return (
    <>
    <Navbar valid={valid} setValid={setValid}/>
      <div className='form'>
            <h1 id="overHeading">Update Employee Details</h1>
            <h6 id="warning">Note: Details Updated can't be redo.</h6>
            <form onSubmit={handleFetch} >
                <label for="inputName4">Employee Id *</label>
                <div  id="fetchBox">
                    <input type="number" name="id" class="form-control" id="id" placeholder="Employee Id" onChange={onChange2} disabled={false} />
                    <button type="submit"  class="btn btn-primary">Fetch</button>
                </div>
            </form>
            <form onSubmit={handleSignup} className="mainForm">
                <div class="form-row">
                    
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Name</label>
                    <input type="text" name="Name" class="form-control" id="name" disabled  placeholder="Name" onChange={onChange1} />
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputName4">Date of Joining</label>
                    <input type="date" name="doj" class="form-control" id="doj" placeholder="" disabled onChange={onChange1} />
                    </div>
                </div>
                <div class="form-row">
                    
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Date of Leaving</label>
                    <input type="date" name="dol" class="form-control" id="dol" placeholder="" disabled={false} onChange={onChange1} />
                    </div>
                </div>
                <button type="submit" id="update" class="btn btn-primary" disabled={false} >Update</button>
            </form>
        </div>
    </>
  )
}

export default Add