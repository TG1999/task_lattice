# task_lattice
INSTALLATION PROCESS
1) npm install
2) npm run start<br>
At Port 1111 server will be running<br>
ENDPOINTS OF API<br>
1)Creation of Patient<br>
localhost:1111/create/patient/:date<br>
Enter Date here in format of YYYY-MM-DD<br>
example 2019-02-30<br>
2)Creation of response<br>
localhost:1111/create/response/:id/:date/:details<br>
Enter patient's id in place of :id <br>
Enter Date here in format of YYYY-MM-DD<br>
example 2019-02-30<br>
Enter response details here<br>
3)Mails the list of patient who haven't filled the survey in four weeks and also returns<br>
a list for same<br>
localhost:1111/res<br>
4)Gives list of patient who haven't submitted any survey in 2 weeks<br>
localhost:1111/surveystatus<br>
5)Returns a list of all patient<br>
localhost:1111/all<br>
<br>
CRON JOBS<br>
1)Will run automatically once in four weeks giving status of patients who did not submit the survey<br>
onceinfourweek<br>
2)Will run every friday notifying patients about survey<br>
everyfriday<br>

<h1>Errors</h1>
1)Unhandled rejection SequelizeConnectionError: Client does not support authentication protocol requested by server; consider upgrading MySQL client sequelize
Run mysql
solution:<h3>use mysql<br>
alter user 'root'@'localhost' identified with mysql_native_password by 'password' </h3>
