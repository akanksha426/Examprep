import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router';
import { FaClipboardList, FaCheckCircle, FaUserGraduate, FaChartLine, FaLightbulb, FaBell } from "react-icons/fa";

const DashboardHome = () => {
  const userId = localStorage.getItem("userId");

  const [examStats, setExamStats] = useState({
    totalExams: 20,
    passed: 10,
    failed: 10,
    progress: 50,
  });

  const [examData, setExamData] = useState([]);
 const [data,setData]=useState([]);
    const handlefetch=async()=>{
        const res= await axios.get('http://localhost:5000/api/exams/exams')
        setData(res.data)
       // console.log(res)
    }
    useEffect(()=>{
        handlefetch();

    },[])
  // Fetch user's exam stats
  useEffect(() => {
  if (!userId) return;

  const fetchStats = async () => {
    try {
      // ✅ Total exams attempted
      const totalRes = await axios.get(`http://localhost:5000/api/admindashboard/exams/${userId}`);
      const totalExams = totalRes.data.totalExams || 20; // adjust according to backend response

      // ✅ Passed exams
      const passedRes = await axios.get(`http://localhost:5000/api/admindashboard/examinee-result/${userId}`);
      const passed = passedRes.data.passed || 10;

      const failed = totalExams - passed;
      const progress = totalExams > 0 ? Math.round((passed / totalExams) * 100) : 10;

      setExamStats({ totalExams, passed, failed, progress });

      // ✅ Detailed exam list
      const examsRes = await axios.get(`http://localhost:5000/api/exams/user/${userId}`);
      setExamData(Array.isArray(examsRes.data) ? examsRes.data : []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  fetchStats();
}, [userId]);

  const stats = [
    { title: "Total Exams", value: examStats.totalExams, icon: <FaClipboardList />, subtitle: "Exams attempted", badge: "Updated" },
    { title: "Passed Exams", value: examStats.passed, icon: <FaCheckCircle />, subtitle: "Exams passed successfully", badge: "Good" },
    { title: "Failed Exams", value: examStats.failed, icon: <FaUserGraduate />, subtitle: "Exams not passed", badge: "Needs Improvement" },
    { title: "Progress", value: `${examStats.progress}%`, icon: <FaChartLine />, subtitle: "Overall completion", badge: "Current" },
  ];

  return (
    <div className="container my-5">

      {/* User Greeting Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card greeting-card p-4 text-center">
            <h2 style={{ color: "#0d6efd", fontWeight: "700" }}>👋 Welcome Back!</h2>
            <p style={{ color: "#34495e", fontSize: "1.1rem", marginTop: "8px" }}>
              Keep track of your exams, monitor your performance, and achieve your learning goals!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="card text-white admin-card h-100 p-4 position-relative overflow-hidden">
              {/* Icon & Badge */}
              <div className="d-flex justify-content-between align-items-start">
                <div className="icon">{stat.icon}</div>
                <div className="info-badge" title={stat.badge}>
                  <FaBell />
                </div>
              </div>

              {/* Card Info */}
              <div className="mt-3">
                <h5 className="card-title">{stat.title}</h5>
                <p className="display-6 fw-bold">{stat.value}</p>
                <small>{stat.subtitle}</small>
              </div>

              {/* Progress Bar */}
              <div className="progress mt-3" style={{ height: "6px", borderRadius: "8px", overflow: "hidden", background: "rgba(255,255,255,0.2)" }}>
                <div className="progress-bar" role="progressbar" style={{ width: stat.progress ? `${examStats.progress}%` : "0%", background: "#00f2fe" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Card */}
      <div className="row g-4">
        <div className="col-md-12">
          <div className="card text-white extra-card p-4 mb-4 d-flex flex-column justify-content-center align-items-start">
            <h4 style={{ fontWeight: "700" }}>💡 Keep Going!</h4>
            <p style={{ fontSize: "1rem", marginTop: "10px", color: "rgba(255,255,255,0.9)" }}>
              Every exam you attempt is a step towards success. Review your progress regularly and keep improving!
            </p>
          </div>
        </div>
      </div>

      {/* Exam Table */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card rounded-4 overflow-hidden mt-3">
            <table className="table table-bordered mb-0">
              <thead className="table-primary text-center">
                <tr>
                  <th colSpan={5} className="fw-bold fs-5">Exams Information</th>
                </tr>
                <tr>
                  <th>SN.</th>
                  <th>Exam Name</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item,i)=>(
                    <tr key={item._id}>
                        <td>{i+1}</td>
                        <td>{item.title}</td>
                        <td>{item.date}</td>
                        <td>{item.duration}</td>
                        <td><Link className='btn btn5 btn-primary' to={`/userDashboard/getexam/`+item._id} >START</Link></td>
                    </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .greeting-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(13,110,253,0.5);
        }
        .admin-card {
          background: linear-gradient(135deg, #8fd6e4, #0d6efd);
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .admin-card::before {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          top: -50%;
          left: -50%;
          background: rgba(255,255,255,0.05);
          transform: rotate(25deg);
          pointer-events: none;
        }
        .admin-card:hover {
          transform: translateY(-8px) scale(1.06);
          box-shadow: 0 20px 45px rgba(0,0,0,0.35);
        }
        .icon {
          font-size: 3rem;
          color: #fff;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .info-badge {
          background: rgba(255,255,255,0.25);
          padding: 6px;
          border-radius: 50%;
          font-size: 1rem;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-title {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .display-6 {
          font-size: 2rem;
          margin: 0;
        }
        .extra-card {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border-radius: 18px;
          box-shadow: 0 12px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;
