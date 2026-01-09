import React from 'react'
import { Link,Outlet } from 'react-router';
import "./AdminDashboard.css";
import img1 from "../../images/Spi logo.png"
import img2 from "../../images/imgs/profile.png"
import { 
  FaCalendarAlt,
  FaBook,
  FaUserGraduate,
  FaQuestionCircle,
  FaChartLine,
  FaLock,
  FaSignOutAlt,
   FaEnvelope,
  
  
} from 'react-icons/fa';


const AdminDashboard = () => {
  const role = localStorage.getItem('role')
if(role=="admin"){
  const email = localStorage.getItem('adminEmail')
}else{
  window.location.href='/Adlogin'
}
  
const getGreeting=()=>{
  const hour = new Date().getHours();
  if(hour<12)return 'Good Morning 🌄';
  if(hour<18)return 'Good Afternoon ☀️';
  return'Good Evening ✨';
};
  return (
  <div className='container-fluid addash'>
    <div className='row'>
        <div className=' admin col-sm-12 d-flex min-vh-100'>
            <div className='col-sm-2 dash'>
               <h3 className=' mt-2 'style={{textAlign:"center",padding:"8px", color: "#1e3a8a", textShadow:"2px 2px 5px  #398ee8ff"}}>Exam Prep</h3>
               <ul className='side flex-column'>
                <h5 style={{textAlign:"center", color: "#1e3a8a", textShadow:"2px 2px 5px  #398ee8ff"}}>Admin Dashboard</h5>
              
                <li className='side-item'><a href="/adminDashboard/session" className='sidelink '><FaCalendarAlt/> Session</a></li>
                <li className='side-item'><a href='/adminDashboard/subject' className='sidelink'><FaBook/> Subject</a></li>
                <li className='side-item'><a href='/adminDashboard/examinee' className='sidelink'><FaUserGraduate/> Examinee</a></li>
                <li className='side-item'><a href='/adminDashboard/question' className='sidelink'><FaQuestionCircle/> Question Bank</a></li>
                 <li className='side-item'><a href='/adminDashboard/examination' className='sidelink'><FaQuestionCircle/> Examination</a></li>
                <li className='side-item'><a href='/adminDashboard/report' className='sidelink'><FaChartLine/> Report Generation</a></li>
                <li className='side-item'><a href='/adminDashboard/change' className='sidelink'><FaLock/> Change Password</a></li>
                 <li className='side-item'><a href='/adminDashboard/message' className='sidelink'>< FaEnvelope/> Message</a></li>
                <li className='side-item'><a href='#' onClick={()=>{
                   localStorage.removeItem('adminEmail')
    localStorage.removeItem('role')
      localStorage.removeItem('id')
      window.location.href='/Adlogin'
                }} className='sidelink'><FaSignOutAlt/> Logout</a></li>

               </ul>
            </div>
           <div className='col-sm-10 'style={{ background: "#e9f5ffff" }}>
            <div className='row'>
               <div className='main2  justify-content-between align-items-center'>
    <h2 className=" mt-4 ms-5 ">{getGreeting()}! Admin </h2>

    <div className="d-flex flex-column align-items-center mt-2 me-2">
        <img 
            src={img2} 
          
            style={{ width: "35px", height: "35px", borderRadius: "50%" }} 
        />
       <span>  <button 
            style={{
                color: "#333",
                fontSize: "14px",
               background:"none",
                border: "none",
              fontWeight:"500" }} 
        >
           My Profile
        </button></span>
    </div></div></div><div 
  style={{
    height: "4px",
    background: "linear-gradient(90deg, #849de4ff, #3b82f6, #60a5fa)",
    borderRadius: "2px",
    margin: "15px 0"
  }}
></div>

    {/*Space to add section*/}<div className='content me-2 ms-1'>
      <Outlet/>
    </div>
</div>
        </div>
       
    </div>
  </div>
  )
}

export default AdminDashboard