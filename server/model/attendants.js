import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DEV_DB_URI
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * =========================================================================== ATTENDANTS SECTION
 */
const createAttendantTable = () => { // ======================================= Create attendant table
    const queryText =
    `CREATE TABLE IF NOT EXISTS
      attendants(
        id SERIAL PRIMARY KEY NOT NULL,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,  
        phoneNo BIGINT ,
        gender VARCHAR(255),
        profilePics VARCHAR(255)         
      )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);         
        });
};

const addAttendants =(firstName, lastName, email, password) => { // ========================================================== Insert into attendants table
    
    const queryText = 'INSERT INTO attendants(firstName, lastName, email, password, phoneNo, gender, profilePics) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [firstName, lastName, email, password, '11111111111', 'update', 'add profile pics'];
    const addedAttendant = pool.query(queryText, values)
        .then((res) => {
            return new Promise((resolve) => {
                resolve(res.rows[0]);                
            }); 
        })
        .catch((e) => {
            console.log(e);
        });
    return addedAttendant;
};
const isEmailInUse = (email) => { // ========================================================== Insert into attendants table
    const queryText = 'SELECT * FROM attendants WHERE email=$1';   
    return pool.query(queryText, [email]);        
   
};


const  getOneAttendant = (email) =>{    
    const queryText = 'SELECT * FROM attendants WHERE email=$1';
    const attendant = pool.query(queryText, email)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return attendant;
};
const dropAttendantsTable = () => { // ====================================================== Drop attendants table
    const queryText = 'DROP TABLE IF EXISTS attendants';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);           
        });
};

module.exports = {
    createAttendantTable,
    dropAttendantsTable,
    addAttendants,
    isEmailInUse,
    getOneAttendant  
};

require('make-runnable');