# 🎯 ExamPrep – MERN Stack Online Examination System

ExamPrep is a scalable full-stack **MERN based online examination and preparation platform** designed to simulate real-world exam environments. It enables students to attempt tests digitally and provides administrators with complete control over exams, questions, and result evaluation.

This project demonstrates **end-to-end full stack development**, backend API design, authentication, and database management.

## 🚀 Key Features

### 👨‍🎓 Student
- Secure registration & login (JWT based)
- View and attempt available exams
- Real-time answer submission
- Automatic result calculation
- Performance tracking

### 🛠 Admin
- Secure admin authentication
- Create, update, and delete exams
- Manage question bank
- Manage students
- View detailed exam results

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React.js, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Token) |
| Tools | VS Code, Postman, GitHub |

---

## 🏗 System Architecture
Admin / Student
↓
React.js Frontend
↓
Node.js + Express API
↓
MongoDB

## 🔐 Role-Based Access Control

| Role | Permissions |
| Student | Register, Login, Attempt Exam, View Result |
| Admin | Create Exams, Manage Questions, Manage Students, View Reports |

## 🧠 Application Workflow

1. User logs in or registers  
2. Student selects an available exam  
3. System displays questions  
4. Student submits answers  
5. Backend evaluates responses  
6. Result is stored in MongoDB  
7. Result is shown to the student  


## ⚙ Installation & Setup

### Clone the Repository

git clone https://github.com/akanksha426/ExamPrep.git
Backend Setup
cd server
npm install
npm start

Frontend Setup
cd client
npm install
npm start

Database Setup

Create a MongoDB database
Add your MongoDB connection URI in .env

📌 What This Project Demonstrates
Full Stack Web Development (MERN)
RESTful API Design
Authentication & Authorization
Database Design (MongoDB)
Role-based Access Control
Real-world Exam System Workflow

📈 Future Scope
Timed exams
Question difficulty levels
Detailed analytics dashboard
Negative marking
Mobile app support

👩‍💻 Developer
Akanksha Mishra
B.Tech (CSE)
Ambalika Institute of Management and Technology
