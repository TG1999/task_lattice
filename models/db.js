var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE patient", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
const Sequelize=require('sequelize');
const db=new Sequelize('patient','root','password',{
    dialect:'mysql',
    host:'localhost',
    port:3306,
    freezeTableName: true,
    operatorsAliases: false,
})

var patient=db.define('patients',{
    pat_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        pat_date:{
            type: Sequelize.DATE
        },
        res_status:{
            type:Sequelize.INTEGER,
            defaultValue:0
        },
        rem_date:{
            type: Sequelize.DATE
        },
        pat_email:{
            type:Sequelize.STRING
        },
        rem_date_start:{
            type: Sequelize.DATE
        },
        two_week:{
            type: Sequelize.DATE
        }
}
)
var response=db.define('response',{
    res_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
    },
    pat_id:{
            type:Sequelize.INTEGER
    },
    res_date:{
        type: Sequelize.DATE
    },
    res_details:{
        type:Sequelize.STRING
    }
})
db.sync().then(()=>{console.log('DB is Synced')})
module.exports={
patient,response,db
}
