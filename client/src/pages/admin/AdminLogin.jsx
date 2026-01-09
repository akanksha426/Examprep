
import axios from 'axios';
import React, { useState } from 'react'

const AdminLogin = () => {
  
  const[form,setForm]=useState({
    email:'',
    password:''
  });
  const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value});

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/admin/login',form);
    if(res.data.message==="Login Successfully"){
      alert("Login Successfully");
      localStorage.setItem('adminEmail',res.data.admin.email);
      localStorage.setItem('id',res.data.admin.id);
      localStorage.setItem('role',res.data.admin.role);
      window.location.href='/adminDashboard'
    }

  }
  return (
  <div className="container justify-content-center d-flex flex-column align-items-center min-vh-100 ">
     <h1 className="text-primary fw-semibold mb-4"style={{fontFamily:"cursive"}}>EXAM PREP</h1>
      <div className="card shadow p-4 col-12 col-sm-8 col-md-6 col-lg-4 outer">
        <div className="headline">
          <h2>ADMIN LOGIN</h2>
        </div>

        <form  method='POST' onSubmit={handleSubmit} className="main-container">
          <label htmlFor="usermail">ENTER YOUR MAIL ID</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            id="usermail"
            placeholder="abc@gmail.com"
            className="form-control"
            required
          />

          <label htmlFor="password">ENTER YOUR PASSWORD</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            id="password"
            placeholder="*******"
            className="form-control"
            required
          />
      

          <button type="submit" className="btn ab btn-primary">
            LOGIN
          </button>
          
         

          <div className="text-center mt-3">
            <a href="/" className="text-decoration-none">Forgot Password?</a>
           
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin