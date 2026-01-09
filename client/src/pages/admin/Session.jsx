
import './AdminDashboard.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
const Session = () => {
  const [form,setForm]= useState({
    name:'',
    description:''
  })
  const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const [id,setId]= useState({
    id:''
  });
  const [edit,setEdit]=useState(null);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
     if(edit){
       const res= await axios.put(`http://localhost:5000/api/session/${id.id}`,form);
      alert("Updated Successfully");

     }
     else{
       const res= await axios.post('http://localhost:5000/api/session',form);
      alert("Added Successfully");
     }
    }
    catch(er){
      alert("Session not Added");
      console.log(er)

    }
  }
  const [data,setData]= useState([]);
  const handlefetch = async()=>{
    const res = await axios.get('http://localhost:5000/api/session');
    setData(res.data)
  }
useEffect (()=>{
  handlefetch()
},[])
const handleDelete = async(id)=>{
  try{
    const res = await axios.delete(`http://localhost:5000/api/session/${id}`);
    alert("Session Deleted Successfully")
    handlefetch()
  }
  catch(er){
    alert("Sorry try again later")
    console.log(er);
  }
}

const handleEdit =(item)=>{
  setForm({
    name:item.name,
    description:item.description
  })
  setEdit(true)
  setId({
    id:item._id
  });
}
  return (
   <div className='ses-container '>
    <div className='row sesinfo'>
        <div className='col-sm-12'>
            <div className="card shadow-lg p-4 rounded-4 mb-4">
            <form method='POST'onSubmit={handleSubmit} className='d-flex flex-column '>
                <label htmlFor='session'>Enter Session:</label>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
            type="text"
            id="sessionName"
            className='form-control shadow-sm'
            placeholder="20XX-XX"
            pattern="20[0-9]{2}-[0-9]{2}"
            required
          />
          <br/>
           <label htmlFor='session'>Description:</label>
                <input
                 name='description'
                 value={form.description}
                onChange={handleChange}
            type="text"
            id="sessionDes"
             className='form-control'
            placeholder="Enter Description"
         
            required
          />
          <button type="submit" className="btn btn1 btn-primary  rounded-4 mt-3">
                Add Session
              </button>

            </form>
        </div>
        </div>
    </div>
         <div className="row">
        <div className="col-sm-12">
          <div className="card  rounded-4 overflow-hidden mt-3">
            <table className="table  table-bordered align-middle mb-0">
              <thead className="table-primary text-center">
                <tr>
                  <th colSpan={5} className="fw-bold fs-5">Sessions</th>
                </tr>
                <tr>
                  <th>SN.</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {data.map((item,i)=>(
                <tr key={item._id}>
                  <td>{i+1}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td></td>
                  <td>
                    <button className=" btn2 btn" onClick={()=>{handleDelete(item._id)}}>Delete</button>
                    <button className=" btn3 btn " onClick={()=>{handleEdit(item)}}>Edit</button>
                  </td>

                </tr>
               ))}
               
              </tbody>
              </table>

    </div>
   </div>
   </div>
   </div>
  )
}

export default Session
