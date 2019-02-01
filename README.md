# task_lattice
INSTALLATION PROCESS
1) npm install
2) npm run start
At Port 1111 server will be running
ENDPOINTS OF API
1)Creation of Patient
localhost:1111/create/patient/:date
Enter Date here in format of YYYY-MM-DD
example 2019-02-30
2)Creation of response
localhost:1111/create/response/:id/:date/:details
Enter patient's id in place of :id 
Enter Date here in format of YYYY-MM-DD
example 2019-02-30
Enter response details here
3)Mails the list of patient who haven't filled the survey in four weeks and also returns
a list for same
localhost:1111/res
4)Gives list of patient who haven't submitted any survey in 2 weeks
localhost:1111/surveystatus
5)Returns a list of all patient
localhost:1111/all

CRON JOBS
1)Will run automatically once in four weeks giving status of patients who did not submit the survey
onceinfourweek
2)Will run every friday notifying patients about survey
everyfriday
