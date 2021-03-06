
import { addSales } from '../model/sales';
import { getAllSales } from '../model/sales';
import { getOneSales } from '../model/sales';
import { getAttendantSales } from '../model/sales';
import { getSalesByDate } from '../model/sales';


export default class SalesController{
    static getSales(req, res){  // Get all sales
        getAllSales()
            .then((sales) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'ALL SALES',
                    Sales:sales
                });
            });
    }
    static getOneSale(req, res){ // Get single sales
        const ID = [req.params.id];
        getOneSales(ID).then((result) => {
            return res.status(200).json({
                Success: true,
                Message: 'Single sale',
                ID,
                sale: result
            });
        });
    }
    static getAttendantSales(req, res){ // Get sales Sales
        const attendant = [req.params.attendant];
        getAttendantSales(attendant).then((result) => {
            if(result.length === 0){
                return res.status(400).json({
                    Success: true,
                    Message: 'No sales record for this attendant'
                });
            }
            return res.status(200).json({
                Success: true,
                Message: 'Attendant sale',
                attendant,
                sale: result
            });
        });
    }
    static getSalesByDate(req, res){ // Get sales by date
        const date = [req.params.date];        
        getSalesByDate(date).then((result) => {
            if(result.length === 0){
                return res.status(200).json({
                    Success: true,
                    Message: 'No sales record for on the provided date'
                });
            }
            return res.status(200).json({
                Success: true,
                Message: 'Sales record by date',
                date,
                sale: result
            });
        });
    }
    static postSales(req, res){  // Post sales
        const { attendant, name, price, quantity, type, category, total } = req.body; 
        addSales( attendant, name, price, quantity, type, category, total)
            .then((response) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'Sales added succesfully',
                    sale: response
                });                
            });     
    }
}

