import { Pool } from 'pg';
import dotenv from 'dotenv';
import { createAttendantTable,  addAttendants } from './attendants';  // IMPORT ATTENDANT QUERIES
import { createProductsTable, addProduct } from './products';         // IMPORT PRODUCT QUERIES
import { createSalesTable, addSales, } from './sales';                // IMPORT SALES QUERIES

dotenv.config();

// CREATE POOL
const pool = new Pool({
    connectionString: process.env.DB_URI
});

// SHOW MESSAGE WHEN CONNECTED
pool.on('connect', () => {
    console.log('connected to the db');
});

// TABLES QUERY
const createTables = `${createAttendantTable}${createProductsTable}${createSalesTable}`;  

pool.query(createTables)
    .then(()=>{ 

        // CREATE ATTENDANTS, PRODUCTS AND SALES TABLES       
        addAttendants('Simon', 'Williams', 'xrolediamond@gmail.com', 'xrolevalsido2634');
        addProduct('Peak', 200, 10, 'Milk', 'Beverage');
        addSales('simon', 'Louis', 120, 4, 'sugar', 'Beverage', 480);

    })
    .catch((error) => console.log(error));



