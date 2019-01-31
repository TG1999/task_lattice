const express=require('express');
const app=express();
const db=require('./models/db').db;
const patients=require('./models/db').patient;
const response=require('./models/db').response;
var schedule = require('node-schedule');
var nodemailer=require('nodemailer')
app.use(express.urlencoded({extended:true}));
app.use(express.json());
var op=db.Op;
//CREATE Patients Entry in database
app.get('/create/patient/:date',(req,res)=>{
    //Date expected in format YYYY-MM-DD
    var now=new Date(req.params.date);
    console.log(now);
    now.setDate(now.getDate()+35);
    var now1=new Date(req.params.date);
    now1.setDate(now1.getDate()+7);
    var now2=new Date(req.params.date);
    now2.setDate(now2.getDate()+14);
    patients.create({
    pat_date:req.params.date,
    rem_date: now,
    rem_date_start:now1,
    two_week:now2
}).then((resp)=>res.send(resp))
})
//CREATE Response entry in database and mark status true for the patient to his id
//and sends mail to doctor
app.get('/create/response/:id/:date/:details',(req,res)=>{
    response.create({
        pat_id:req.params.id,
        res_date:req.params.date,
        res_details:req.params.details
    }).then((resp)=>{
        console.log(resp.details,resp.pat_id);
        html=`Response from ${resp.pat_id} is ${resp.details}`
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'replace it with email address',
        //       pass: 'replace it with pass'
        //     }
        //   });
            // var mailOptions = {
            //   from:'replace it with name <replace it with email address>',
            //   to:'doctor email address',
            //   subject:'Response from Patient',
            //   html
            // };
            
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ');
            //   }
            // }); 
          
    })
    patients.update({
        res_status:1
    },{
        where:{
            pat_id:req.params.id
        }
    })
    res.send('SUCESS')
})
//Mails the list of patient who haven't filled the survey in four weeks and also returns
//a list for same
app.get('/res',(req,res)=>{
    var da=new Date();
    da.setUTCHours(0,0,0,0);
    console.log(da);
  patients.findAll({ 
      where:{
        rem_date:{[op.gt]:da},
        rem_date_start:{[op.lt]:da},
        res_status:0
        }   
  }).then((resp)=>{
    html=`${resp}`
    // var transporter = nodemailer.createTransport({
      //     service: 'gmail',
      //     auth: {
      //       user: 'replace it with email address',
      //       pass: 'replace it with pass'
      //     }
      //   });
          // var mailOptions = {
          //   from:'replace it with name <replace it with email address>',
          //   to:'doctor email address',
          //   subject:'Response from Patient',
          //   html
          // };
          
          // transporter.sendMail(mailOptions, function(error, info){
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log('Email sent: ');
          //   }
          // }); 
      res.send(resp)
  })
})
//Gives list of patient who haven't submitted any survey in 2 weeks
app.get('/surveystatus',(req,res)=>{
    var da=new Date();
    da.setUTCHours(0,0,0,0);
    patients.findAll({
        where:{
            res_status:0,
            rem_date_start:{[op.lt]:da},
            two_week:{[op.gt]:da}
        }
    }).then((resp)=>{
        res.send(resp)
    })
})
//Will run automatically once in four weeks giving status of patients who did not submit the survey
var onceinfourweek = schedule.scheduleJob('* 0 0 ? * * *', function(){
    var da=new Date();
    da.setUTCHours(0,0,0,0);
    console.log(da);
  patients.findAll({ 
      where:{
        rem_date:{[op.gt]:da},
        rem_date_start:{[op.lt]:da},
        res_status:0
        }   
  }).then((resp)=>{
      html=`${resp}`
      // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'replace it with email address',
        //       pass: 'replace it with pass'
        //     }
        //   });
            // var mailOptions = {
            //   from:'replace it with name <replace it with email address>',
            //   to:'doctor email address',
            //   subject:'Response from Patient',
            //   html
            // };
            
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ');
            //   }
            // }); 
  })
});
onceinfourweek;
var everyfriday = schedule.scheduleJob('* 0 0 ? * FRI *', function(){
    patients.findAll({
    }).then((resp)=>{
        if(Array.isArray(resp)){
            for(ele in resp)
            {html=``;
                if(resp[ele].res_status==0)
                {
                html=`You have not filled the survey yet`;
                }
                else{
                    html=`You have filled the survey`;
                }
                // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'replace it with email address',
        //       pass: 'replace it with pass'
        //     }
        //   });
            // var mailOptions = {
            //   from:'replace it with name <replace it with email address>',
            //   to:resp[ele].pat_email,
            //   subject:'Response from Doctor',
            //   html
            // };
            
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ');
            //   }
            // }); 
            }
        }
    }) 
});
everyfriday;
const PORT=process.env.PORT||1111;
app.listen(PORT)