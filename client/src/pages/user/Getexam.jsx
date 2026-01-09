import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';


const Getexam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  // Fetch exam and set initial state
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  // Check if test is started within a time limit (e.g., 30 seconds)
  useEffect(() => {
    if (!exam || testStarted) return;

    const startTimeout = setTimeout(() => {
      if (!testStarted) {
        setError('Test expired: You did not start the test within the allowed time.');
        setSubmitted(true);
        navigate('/userdash/profile');
      }
    }, (1000*timeLeft)); // 30 seconds to start the test

    return () => clearTimeout(startTimeout);
  }, [exam, testStarted, navigate]);

  // Timer for exam duration
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  // Security: Prevent tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStarted && !submitted) {
        setError('Violation: Tab switching detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, submitted]);

  // Security: Disable cut, copy, paste
  useEffect(() => {
    const preventCopyPaste = (e) => {
      if (testStarted && !submitted) {
        e.preventDefault();
        setError('Violation: Cut/Copy/Paste detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);

    return () => {
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true); // Mark test as started when user answers a question
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
        examId,
        answers,
        email,
      });
      setResult(res.data);
      setSubmitted(true);
      alert('Your Exam was submitted successfully. Result will be declared soon.');
     window.location.href='/userDashboard';
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div className="text-center m-4">Loading...</div>;
  }

  return (
    
    <div className="container mt-4">
      <div
  className="container-fluid d-flex align-items-center justify-content-center"
  style={{
    minHeight: "100vh",
   // background: "linear-gradient(135deg, #e0eafc, #cfdef3)", 
    padding: "20px",
  }}
>
  <div
    className="card shadow-lg p-4 rounded-4"
    style={{ width: "90%", maxWidth: "1000px", background: "white" }}
  >
     {/* Exam Title */}
<h2
  className="text-center fw-bold mb-4"
  style={{
    fontSize: "2rem",
   
   // color: "#2c3e50",
    textTransform: "uppercase",

    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  }}
>
  {exam.title}
</h2>

      <div className="card shadow-lg border-0 rounded-4 mb-4" 
     style={{ background: "linear-gradient(135deg,  #a3caecff, #b8ebeeff)" }}>
  <div className="card-body p-4">
    <table className="table table-bordered align-middle text-center mb-0">
      <thead>
        <tr style={{ background: "linear-gradient(90deg, #92c6f4ff, #00f2fe)", color: "white" }}>
          
          <th className="py-3">📅 Date</th>
          <th className="py-3">⏱ Duration</th>
          <th className="py-3">❓ Questions</th>
          <th className="py-3 rounded-end">📝 Marks</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: "#ffffff" }}>
     
          <td> {exam.date}</td>
          <td>{exam.duration} min</td>
          <td> {questions.length}</td>
          <td> {exam.totalMarks}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      {submitted && result ? (
        <div className="alert alert-info">
          <h4>Exam Results</h4>
          <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
          <p><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
          <h5>Answer Details:</h5>
          <ul>
            {result.results.map((res, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {res.question}<br />
                <strong>Your Answer:</strong> {res.selectedAnswer || 'Not answered'}<br />
                <strong>Correct Answer:</strong> {res.correctAnswer}<br />
                <strong>Result:</strong> {res.isCorrect ? 'Correct' : 'Incorrect'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {!testStarted && (
            <div 
  className="alert d-flex align-items-center shadow-sm border-0 rounded-4 mb-4" 
  style={{ 
    background: "linear-gradient(90deg, #fff3cd, #ffeeba)", 
    color: "#856404", 
    fontWeight: "500",
    fontSize: "1rem",
    padding: "15px 20px"
  }}
  role="alert"
>
  <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>⚠️</span>
  <div>
    Please read the instructions carefully before starting the exam.  
    <span style={{ fontWeight: "600" }}>⏰ Time is limited, and answers cannot be changed once submitted.</span>
  </div>
</div>

          )}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
           
             {questions.map((q, index) => (
  <div 
    key={q._id} 
    className="card mb-4 shadow-sm border-0 rounded-4"
    style={{
      background: "linear-gradient(180deg,  #aceff2ff,#2373b9ff)",
      border: "1px solid #e3e9f0",
    }}
  >
    <div className="card-body">
      {/* Question Text */}
      <h5 
        className="fw-bold mb-3"
        style={{ 
          color: "#1e3a8a", 
          fontSize: "1.1rem",
          borderBottom: "2px solid #e3e9f0",
          paddingBottom: "8px"
        }}
      >
        Q{index + 1}. {q.question}
      </h5>

      {/* Options */}
      <div className="list-group border-0">
        {[q.optionA, q.optionB, q.optionC, q.optionD].map((option, i) => (
          <label
            key={i}
            className={`list-group-item d-flex align-items-center rounded-3 mb-2 border`}
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: answers[q._id] === option 
                ? "2px solid #268ae1ff" 
                : "1px solid #e3e9f0",
              background: answers[q._id] === option 
                ? "linear-gradient(135deg, #e0f7ff, #f0faff)" 
                : "white",
              boxShadow: answers[q._id] === option 
                ? "0 3px 10px rgba(0, 242, 254, 0.25)" 
                : "none",
            }}
          >
            <input
              type="radio"
              name={`question-${q._id}`}
              value={option}
              checked={answers[q._id] === option}
              onChange={() => handleAnswerChange(q._id, option)}
              disabled={submitted}
              className="form-check-input me-3"
              style={{ cursor: "pointer" }}
            />
            <span style={{ fontSize: "0.95rem", color: "#2c3e50" }}>
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
))}


            <div className="text-center mt-4">
  <button
    type="submit"
    className="btn px-5 py-2"
    disabled={submitted}
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "white",
      background: "linear-gradient(135deg, #2373b9ff, #00f2fe)",
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    }}
  >
     FINISH
  </button>
</div>

          </form>
        </>
      )}
    </div>
    </div>
    </div>
  );
};

export default Getexam;