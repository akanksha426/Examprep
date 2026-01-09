import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Registration = () => {
  const [form,setForm]=useState({
    name:'',
    email:'',
    password:'',
    college:'',
    course:'',
    branch:'',
    session:'',
    phone:'',
    
  })
  const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
   try{
     const res = await axios.post('http://localhost:5000/api/examinee',form);
     alert("Registered successfully")
     window.location.href='/'
   }
   catch(er){
    console.log(er)
    alert("Sorry Try again later")
   }
  }

const [data,setData]=useState([])
  const handlefetch=async()=>{
   try{
     const res = await axios.get('http://localhost:5000/api/session');
     setData(res.data)
   }
   catch(er){
    console.log(er)

   }
  }

  useEffect(()=>{
    handlefetch();
  },[])
  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
       <div className="headline">
          <h2 style={{fontFamily:"cursive", fontSize:"38px"}}>REGISTRATION </h2>
        </div>
      <div className="outer p-4 shadow-lg" >
        
    
        <form className="main-container" method='POST'onSubmit={handleSubmit}>
     
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name='name'
            onChange={handleChange}
           
            placeholder="Enter your full name"
            required
          />

        
          <label htmlFor="mail">Email Address</label>
          <input
            type="email"
            id="mail"
            name='email'
       
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="pass"
            name='password'
         
            onChange={handleChange}
            placeholder="*****"
            required
          />


      
         

          <label htmlFor="college">College/University Name</label>
          <input
            type="text"
            id="college"
            name='college'
           
            onChange={handleChange}
            placeholder="Enter your College/University name"
            required
          />

        
          <label htmlFor="course">Course</label>
           <input
            type="text"
            id="course"
            name='course'
        
            onChange={handleChange}
            placeholder="Enter your Course"
            required
          />
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            name='branch'
          
            onChange={handleChange}
            id="brname"
            placeholder="Enter your Branch"
            required
          />

         
          <label htmlFor="session"> Session</label>
         <select name="session" id="" onChange={handleChange} className='form-select'>
          <option value="">Select Session</option>
          {data.map((item)=>(
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
         </select>
           <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name='phone'
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />

          <button type="submit" className="cd mt-2">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration