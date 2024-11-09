import mysql from 'mysql';
import myConnection from 'express-myconnection';
import 'dotenv/config';


const connection = myConnection(mysql, {
    host:     process.env.DB_HOST || 'localhost',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    port:     process.env.DB_PORT || '3306',
    database: process.env.DB_NAME || 'locadora'
}, 'single');


export default connection;