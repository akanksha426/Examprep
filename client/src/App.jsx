
import './App.css'
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router';
import Login from './pages/Login';
import AdminLogin from './pages/admin/AdminLogin';
import Registration from './pages/Registration';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import Session from './pages/admin/Session';
import Subject from './pages/admin/Subject';
import Examinee from './pages/admin/Examinee';
import Examination from './pages/admin/Examination';
import QuestionBank from './pages/admin/QuestionBank';
import Myexams from './pages/user/Myexams';
import Myresult from './pages/user/Myresult';
import Getexam from './pages/user/Getexam';
import Message from './pages/user/Message';
import ChangePassword from './pages/user/ChangePassword';
import DashboardHome from './pages/user/DashboardHome';
import ReportGeneration from './pages/admin/ReportGeneration';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import MessageReply from './pages/admin/MessageReply';
import AdminHome from './pages/admin/AdminHome';


function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Adlogin' element={<AdminLogin/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        {/*ad route start*/}
        <Route path='/adminDashboard' element={<AdminDashboard/>}>
        <Route index element={<AdminHome/>}></Route>
        <Route path='session' element={<Session/>}></Route>
         <Route path='subject'element={<Subject/>}></Route>
          <Route path='examinee' element={<Examinee/>}></Route>
          <Route path='examination' element={<Examination/>}></Route>
            <Route path='question' element={<QuestionBank/>}></Route>
            <Route path='report' element={<ReportGeneration/>}></Route>
            <Route path='change'element={<AdminChangePassword/>}></Route>
            <Route path='message' element={<MessageReply/>}></Route>
        </Route>
        {/*ad route end*/}

        {/*userroute*/ }
        <Route path='/userDashboard' element={<UserDashboard/>}>
        <Route index element={<DashboardHome/>}></Route>
        <Route path='myexams'element={<Myexams/>}></Route>
        <Route path='myresult'element={<Myresult/>}></Route>
        <Route path='getexam/:id'element={<Getexam/>}></Route>
        <Route path='message' element={<Message/>}></Route>
        <Route path='change'element={<ChangePassword/>}></Route>
        </Route>
       
       
       
    
      </Routes>
     </Router>
    </>
  )
}

export default App
