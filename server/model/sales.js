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
 * 
 * 
 * =========================================CREATE PRODUCT TABLE
 * 
 * 
 */
const createSalesTable = () => {  
    const queryText =
    `CREATE TABLE IF NOT EXISTS
      sales(
        id SERIAL PRIMARY KEY NOT NULL,
        attendant VARCHAR(128),
        name text NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,          
        type text,
        category text NOT NULL,
        total INT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP                 
      )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * ============================= ADD SALES
 * 
*/


const addSales =(attendant, name, price, quantity, type, category, total) => {     
    const queryText = 'INSERT INTO sales(attendant, name, price, quantity, type, category, total) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [ attendant, name, price, quantity, type, category, total];
    const addedProduct = pool.query(queryText, values)
        .then((res) => {            
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        }).catch((e) => {
            console.log(e); 
        });
    return addedProduct;
};
/**
* =============================== GET ALL SALES
*/
const  getAllSales = () =>{     
    const queryText = 'SELECT * FROM sales';
    const sales = pool.query(queryText)
        .then((res) => {          
            return new Promise((resolve) =>{                
                resolve(res.rows);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return sales;
};


/**
  * =============================== GET ONE PRODUCTS
*/

const  getOneSales = (id) =>{    
    const queryText = 'SELECT * FROM sales WHERE id=$1';
    const sale = pool.query(queryText, id)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        });

    return sale;
};
/**
  * =============================== GET ONE PRODUCTS
*/

const  getAttendantSales = (attendant) =>{    
    const queryText = 'SELECT * FROM sales WHERE attendant=$1';
    const sale = pool.query(queryText, attendant)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        });

    return sale;
};
/**
  * =============================== GET ONE PRODUCTS
*/

const  getSalesByDate = (date) =>{    
    const queryText = 'SELECT * FROM sales WHERE date=$1';
    const salesByDate = pool.query(queryText, date)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        });

    return salesByDate;
};


module.exports = {
    createSalesTable,
    addSales,
    getAllSales ,
    getOneSales,
    getAttendantSales,
    getSalesByDate 
};

require('make-runnable');







