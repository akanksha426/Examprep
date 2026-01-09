import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/examinee');
    setData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try Again Later");
    }
    handlefetch();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      number: item.number,
      address: item.address,
      college: item.college,
      qualification: item.qualification,
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
      alert('Examinee Updated Successfully');
      setForm({
        name: '',
        email: '',
        college: '',
        course: '',
        branch: '',
       phone: ''
      });
      setEditingId(null);
      setEditFormVisible(false);
      handlefetch();
    } catch (error) {
      console.error("Error updating examinee:", error);
      alert("Error updating examinee");
    }
  };

  return (
    <>
     
       {editFormVisible && (
         <div className='ses-container '>
      <div className='row sesinfo'>
        <div className='col-sm-12'>
            <div className="card shadow-lg p-4 rounded-4 mb-4">
          
            <form className="border p-2 rounded" onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="College" required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="course" value={form.course} onChange={handleChange} placeholder="Course" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                </div>
              </div>
              <button type="submit" className="btn btn-light text-white mb-1 me-2" style={{ background: "#39064fff " }}>Update</button>
              <button type="button" className="btn-edit" onClick={() => setEditFormVisible(false)}>Cancel</button>
            </form>
          </div>
        </div>
        </div>
        </div>
      )}

        <div className="card-body">
          
          <div className="row">
            <div className="col-sm-12">
             <div className="card  rounded-4 overflow-hidden mt-3 ms-3">
            <table className="table  table-bordered align-middle mb-0">
                <thead className="table-primary text-center">
                 
                     <tr>
                  <th colSpan={8} className="fw-bold fs-5">Examinee Information</th>
                </tr>
                 <tr>
                  
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Email</th>
                  
                    <th>College</th>
                    <th>Course</th>
                    
                    <th>Branch</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item._id }>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    
                      <td>{item.college}</td>
                      <td>{item.course}</td>
                      <td>{item.branch}</td>
                      <td>{item.phone}</td>
                      <td>
                        <button className="btn btn3 me-2" onClick={() => handleEdit(item)}><FaEdit/></button>
                        <button className="btn btn2" onClick={() => handleDelete(item._id)}><FaTrash/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     </div>
    
    </>
  );
};

export default Examinee;