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
const createProductsTable = () => {  
    const queryText =
    `CREATE TABLE IF NOT EXISTS
      products(
        id SERIAL PRIMARY KEY NOT NULL,
        name text NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,          
        type text,
        category text NOT NULL,
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
 * 
 * =============================== INSERT INTO PRODUCT TABLE
 * 
 * 
 */
const addProduct =(name, price, quantity, type, category) => { 
    
    const queryText = 'INSERT INTO products(name, price, quantity, type, category) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, price, quantity, type, category];
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
* =============================== GET ALL PRODUCTS
*/
const  getAllProducts = () =>{     
    const queryText = 'SELECT * FROM products';
    const product = pool.query(queryText)
        .then((res) => {          
            return new Promise((resolve) =>{                
                resolve(res.rows);
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return product;
};

/**
  * =============================== GET ONE PRODUCTS
*/

const  getOneProduct = (id) =>{    
    const queryText = 'SELECT * FROM products WHERE id=$1';
    const product = pool.query(queryText, id)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows[0]);
            });
        });

    return product;
};
const  deleteOneProduct = (id) =>{    
    const queryText = 'DELETE FROM products WHERE id=$1';
    const product = pool.query(queryText, id)
        .then((res) => {          
            return new Promise((resolve) =>{
                resolve(res.rows);
            });
        });

    return product;
};

/**
  * =============================== EDIT PRODUCTS BY ID
*/
const  editProduct = (name, price, quantity, type, category, id ) =>{    
    const queryText = 'UPDATE products SET name=$1, price=$2, quantity=$3, type=$4, category=$5 WHERE id=$6 RETURNING *';
    const values = [name, price, quantity, type, category, id];
    const product = pool.query(queryText, values)
        .then((res) => {          
            return new Promise((resolve) =>{
                console.log('res......', res.rows);
                resolve(res.rows[0]);
            });
        })
        .catch((e) => console.log(e));
        
    return product;
};

/**
  * =============================== DROP PRODUCT TABLE
*/
const dropProductsTable = () => { 
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
    getAllProducts,
    dropProductsTable,
    getOneProduct,
    editProduct,
    deleteOneProduct
};

require('make-runnable');







