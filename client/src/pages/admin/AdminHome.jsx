import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaClipboardList, FaCalendarCheck, FaUserGraduate, FaHourglassHalf, FaInfoCircle, FaBell, FaBook, FaQuestionCircle } from "react-icons/fa";

const AdminHome = () => {
    const[data,setData]=useState([])
    const handlefetch=async()=>{
        const res = await axios.get('http://localhost:5000/api/admindashboard/')
        setData(res.data);
    }
    useEffect(()=>{
        handlefetch()},[])
       
 
  const stats = [
    { title: "Total Exams", value:  data.totalExams, icon: <FaClipboardList />, subtitle: "All exams in system",  badge: "Updated" },
    { title: "Total Questions", value: data.totalQuestions, icon: <FaQuestionCircle />, subtitle: "Completed exams", badge: "New" },
    { title: "Total Examinees", value: data.totalExaminees, icon: <FaUserGraduate />, subtitle: "Registered students",  badge: "High Participation" },
    { title: "Total Subject", value: data.totalSubject, icon: <FaBook />, subtitle: "Scheduled soon",  badge: "Soon" },
  ];

  return (
    <div className="container my-5">

      {/* Admin Greeting Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card greeting-card p-4 text-center">
            <h2 style={{ color: "#0d6efd", fontWeight: "700" }}>👋 Welcome, Admin!</h2>
            <p style={{ color: "#34495e", fontSize: "1.1rem", marginTop: "8px" }}>
              We are glad to see you! Manage exams, monitor performance, and stay on top of upcoming schedules.
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
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
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${stat.progress}%`, background: "#00f2fe" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome & Tips Cards */}
      <div className="row g-4">
        {/* Welcome Message */}
        <div className="col-md-6">
          <div className="card text-white extra-card p-4 mb-4 d-flex flex-column justify-content-center align-items-start" style={{ height: "100%" }}>
            <h4 style={{ fontWeight: "700" }}>👋 Welcome Back, Admin!</h4>
            <p style={{ fontSize: "1rem", marginTop: "10px", color: "rgba(255,255,255,0.9)" }}>
              We’re glad to see you again! Check the latest exams, review student performance, and manage upcoming schedules efficiently.
            </p>
          </div>
        </div>

        {/* Tips & Notifications */}
        <div className="col-md-6">
          <div className="card text-white extra-card p-4 mb-4" style={{ height: "100%" }}>
            <h5>💡 Tips & Notifications</h5>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.9)" }}>
              Schedule new exams early to avoid clashes. Review performance trends weekly to improve student outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .greeting-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(13,110,253,0.5); /* blue shadow */
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
        .progress-bar {
          transition: width 1s ease-in-out;
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

export default AdminHome;
