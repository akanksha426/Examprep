import axios from 'axios'
import React, { useState } from 'react'

const ChangePassword = () => {
    const id=localStorage.getItem('userId');
    const[form,setForm]=useState({
        op:'',
        np:'',
        cnp:''
    })
    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        const res = await axios.put(`http://localhost:5000/api/examinee/change/${id}`,form)
         alert( res.data.message)}
         catch(er){
            console.log(er)
             //alert( res.data.message)

         }
    }
  return (
    <div
  className='d-flex justify-content-center mt-5'

>
  <div
    className="card shadow-lg p-4 rounded-4"
    style={{
      background: "linear-gradient(135deg, #f0f6ff, #d9eaff)",
      border: "none",
      maxWidth: "450px",
      width: "100%",
    }}
  >
    <h3
      style={{
        textAlign: "center",
        fontWeight: "600",
        color: "#1e3a8a",
        marginBottom: "30px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      🔒 Change Your Password
    </h3>

    <form method='POST' onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <label htmlFor='oldpassword' style={{ fontWeight: "600", color: "#1e3a8a", display: "block", marginBottom: "5px" }}>
          Old Password:
        </label>
        <input
          name='op'
          onChange={handleChange}
          type="password"
          id="oldpassword"
          placeholder="Enter Old Password"
          required
          className='form-control'
          style={{
            borderRadius: "12px",
            padding: "12px 15px",
            border: "1px solid #a3c0f9",
            background: "#f0f6ff",
            fontSize: "15px",
            color: "#1e3a8a",
          }}
        />
      </div>

      <div style={{ width: "100%", marginBottom: "20px" }}>
        <label htmlFor='newpassword' style={{ fontWeight: "600", color: "#1e3a8a", display: "block", marginBottom: "5px" }}>
          New Password:
        </label>
        <input
          name='np'
          onChange={handleChange}
          type="password"
          id="newpassword"
          placeholder="Enter New Password"
          required
          className='form-control'
          style={{
            borderRadius: "12px",
            padding: "12px 15px",
            border: "1px solid #a3c0f9",
            background: "#f0f6ff",
            fontSize: "15px",
            color: "#1e3a8a",
          }}
        />
      </div>

      <div style={{ width: "100%", marginBottom: "20px" }}>
        <label htmlFor='conpassword' style={{ fontWeight: "600", color: "#1e3a8a", display: "block", marginBottom: "5px" }}>
          Confirm New Password:
        </label>
        <input
          name='cnp'
          onChange={handleChange}
          type="password"
          id="conpassword"
          placeholder="Confirm New Password"
          required
          className='form-control'
          style={{
            borderRadius: "12px",
            padding: "12px 15px",
            border: "1px solid #a3c0f9",
            background: "#f0f6ff",
            fontSize: "15px",
            color: "#1e3a8a",
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary rounded-4 mt-3"
        style={{
          width: "50%",
          padding: "12px",
          fontWeight: "600",
          background: "linear-gradient(90deg, #4facfe, #00f2fe)",
          border: "none",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        Submit
      </button>
    </form>
  </div>
</div>
  )
}

export default ChangePassword
