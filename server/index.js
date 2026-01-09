const express = require('express');
const cors=require ('cors');
const mongoose=require ('mongoose');
const app=express();

app.use(cors());
app.use(express.json());
const URL='mongodb://localhost:27017/examprep'
mongoose.connect(URL)
.then(()=>{
    console.log('MongoDB Connected')
})
.catch((er)=>{
    console.log(er)
})
//api started
app.use('/api/admin/',require('./routes/adminRoutes'));
app.use('/api/session/',require('./routes/sessionRoute'));
app.use('/api/subject/',require('./routes/subjectRoute'));
app.use('/api/exams/',require('./routes/examinationRoute'));
app.use('/api/question/',require('./routes/questionbankRoute'));
app.use('/api/examinee/',require('./routes/examineeRoute'));
app.use('/api/message',require('./routes/messageroute'));
app.use('/api/admindashboard/',require('./routes/adminDashboard'))
//api ended

app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000/")
})