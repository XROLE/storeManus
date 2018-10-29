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
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const addAttendants =(firstName, lastName, email, password) => { // ========================================================== Insert into attendants table
    
    const queryText = 'INSERT INTO attendants(firstName, lastName, email, password, phoneNo, gender, profilePics) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [firstName, lastName, email, password, '11111111111', 'update', 'add profile pics'];
    pool.query(queryText, values)
        .then((res) => {
            console.log('record insereted successfully, res: ', res.rows[0]);
            pool.end();
        });
};

const dropAttendantsTable = () => { // ====================================================== Drop attendants table
    const queryText = 'DROP TABLE IF EXISTS attendants';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};






// const addAdmin =() => {
//     const queryText = 'INSERT INTO admin(id, email, password) VALUES($1, $2, $3) RETURNING *';
//     const values = ['45745c60-7b1a-11e8-9c9c-2d42b21b1a3e', 'xrolediamond@gmail.com', 'xrolevalsido2634'];
//     pool.query(queryText, values)
//         .then((res) => {
//             console.log('record insereted successfully, res: ', res);
//             pool.end();
//         });
// };



module.exports = {
    createAttendantTable,
    dropAttendantsTable,
    addAttendants  
};

require('make-runnable');







