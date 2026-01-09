import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/examinee/login",
        form
      );
      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userRole", res.data.user.role);
        window.location.href = "/userDashboard";
      }
    } catch (er) {
      console.log(er);
      alert("Sorry try again later");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center ">
      <div className="row shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "1000px", width: "100%" }}>

        {/* LEFT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
             style={{ 
               background: "linear-gradient(135deg, #113ccbff 0%, #6898ecff 100%)",
               position: "relative"
             }}>
          
          <h2 className="fw-bold mb-4">Exam Prep<br />Your Smart Learning Hub</h2>
          <p className="small mb-4">
            Sharpen your skills. Master your exams. Achieve your dreams with smart, fast, and effective preparation.
          </p>
          <div className="mb-3">
            <h5 className="fw-semibold">📚 Track Your Progress</h5>
            <p className="small">
              Keep an eye on your performance and improve day by day with our intelligent tracking system.
            </p>
          </div>
          <div className="mb-3">
            <h5 className="fw-semibold">🚀 Ace Every Exam</h5>
            <p className="small">
              Learn smarter, not harder. Focus on what matters most and excel in your exams with confidence.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (LOGIN FORM) */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
         
          <h3 className="fw-bold text-center mb-3">Login to Your Account</h3>
          <p className="text-center small">
            Don't have an account?{" "}
            <Link to="/registration" className="text-decoration-none fw-semibold">Create New Account</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="E-mail address"
                className="form-control rounded-3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control rounded-3"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-3 mb-3">
              Login
            </button>
          </form>

          {/* Registration Button */}
          <div className="text-center mt-2">
            <Link to="/registration">
              <button className="btn btn-primary w-50 rounded-3">
                Create New Account
              </button>
            </Link>
          </div>

          </div>
      </div>
    </div>
  );
};

export default Login;
