import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Myresult = () => {
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')
    const handlefetch = async () => {
        const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        console.log(res)
        setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

    }
    const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report </h2>
          <table>
            <tr><th>Exam Name</th><td>${item.examId?.title}</td></tr>
            <tr><th>Name</th><td>${item.examineeId?.name || item.examineeId}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.score}</td></tr>
            <tr><th>Score</th><td>${item.passingMarks}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
    useEffect(() => {
        handlefetch()
    }, [])
    // console.log(data);
   
    return ( 
    <div className='exam-container'>
     <div className="row">
        <div className="col-sm-12">
          <div className="card  rounded-4 overflow-hidden mt-3">
            <table className="table  table-bordered mb-0">
              <thead className="table-primary text-center">
                <tr>
                  <th colSpan={9} className="fw-bold fs-5">Result Information</th>
                </tr>
                <tr>
                 <th>S.N</th>
                        <th>Exam name</th>
                        <th>Your Name</th>
                        <th>Total Marks</th>
                        <th>Score</th>
                        <th>Passing Marks</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                </tr>
              </thead>
              <tbody>
       
                    {data
                    .map((item, i) => (
                        <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.examId?.title}</td>
                            <td>{item.examineeId?.name || item.examineeId}</td>

                            <td>{item.totalMarks}</td>
                            <td>{item.score}</td>
                            <td>{item.passingMarks}</td>
                            <td>{item.status}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                             <td>
                                            <button className="btn btn-sm btn-primary" onClick={()=>{handlePrint(item)}}>Print</button>
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

export default Myresult