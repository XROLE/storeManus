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
 * =========================================================================== PRODUCT SECTION
 */
const createProductsTable = () => { // ======================================= Create product table
    const queryText =
    `CREATE TABLE IF NOT EXISTS
      products(
        id SERIAL PRIMARY KEY NOT NULL,
        Name VARCHAR(128) NOT NULL,
        Price INT NOT NULL,
        Quantity INT NOT NULL,          
        Type VARCHAR(128) NOT NULL,
        Category VARCHAR(128) NOT NULL,
        Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP                 
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

const addProduct =(name, price, quantity, type, category) => { // ========================================================== Insert into attendants table
    
    const queryText = 'INSERT INTO products(name, price, quantity, type, category) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, price, quantity, type, category];
    const addedProduct = pool.query(queryText, values)
        .then((res) => {
            console.log('record insereted successfully, res: ', res.rows[0]);
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
            // pool.end();
        }).catch((e) => {
            console.log(e); 
        });
    return addedProduct;
};

const  getOneProduct = () =>{    
    const queryText = 'SELECT * FROM products WHERE name=$1';
    const product = pool.query(queryText, ['Luna Milk'])
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        });
    return product;
};
const dropProductsTable = () => { // ====================================================== Drop attendants table
    const queryText = 'DROP TABLE IF EXISTS products';
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

module.exports = {
    createProductsTable,
    addProduct,
    dropProductsTable,
    getOneProduct
};

require('make-runnable');







