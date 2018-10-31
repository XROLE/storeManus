import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URI
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
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
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
            // pool.end();
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


module.exports = {
    createSalesTable,
    addSales,
    getAllSales ,
    getOneSales  
};

require('make-runnable');







