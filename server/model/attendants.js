import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();




const pool = new Pool({
    connectionString: process.env.DB_URI
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

const addAttendants =(firstName, lastName, email, password) => { // =========================================== Insert into attendants table

    const queryText = 'INSERT INTO attendants(firstName, lastName, email, password, phoneNo, gender, profilePics) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [firstName, lastName, email, password, '11111111111', 'update', '../img/avatar.jpg'];
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
const isEmailInUse = (email) => { // ======================================= CHECK IF EMAIL IS IN USE
    const queryText = 'SELECT * FROM attendants WHERE email=$1';
    return pool.query(queryText, [email]);

};

/**
  * =============================== UPDATE ATTENDANT PROFILE
*/
const  updateAttendant = (firstName, lastName, email, password, phoneno, gender, profilepics, id ) =>{
    const queryText = 'UPDATE attendants SET firstName=$1, lastName=$2, email=$3, password=$4, phoneno=$5, gender=$6, profilepics=$7 WHERE id= $8 RETURNING *';
    const values = [firstName, lastName, email, password, phoneno, gender, profilepics, id];
    const updatedAttendant = pool.query(queryText, values)
        .then((res) => {
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        })
        .catch((e) => console.log(e));

    return updatedAttendant;
};



const  getOneAttendant = (email) =>{
    const queryText = 'SELECT * FROM attendants WHERE email=$1';
    const attendant = pool.query(queryText, email)
        .then((res) => {
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return attendant;
};
const  getOneAttendantById = (id) =>{
    const queryText = 'SELECT * FROM attendants WHERE id=$1';
    const attendant = pool.query(queryText, id)
        .then((res) => {
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return attendant;
};
const  getAttendants = () =>{
    const queryText = 'SELECT * FROM attendants';
    const attendants = pool.query(queryText)
        .then((res) => {
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return attendants;
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
    getOneAttendant,
    getAttendants,
    getOneAttendantById,
    updateAttendant
};

require('make-runnable');
