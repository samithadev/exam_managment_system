const express = require('express');
const cors = require('cors');
// var mysql = require('mysql');
const userRouter = require('./api/user');
const roleRouter = require('./api/role');
const sql_connection = require('./db/db');
const examRouter = require('./api/exam');

const app = express();
app.use(express.json());
app.use(cors());

// var sql_connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'ems_db'
// })

const connectDB = async () => {
    try{
        if(!sql_connection){
            return new Error("can't connect sql");
        }
        console.log('DB connection sucessfull!')
    }
    catch(error){
        console.log(error)
    }
}

connectDB();

app.use("/user", userRouter)
app.use("/role", roleRouter)
app.use("/exam", examRouter)

app.listen(8000, ()=> console.log("Server is listening on port 8000."))