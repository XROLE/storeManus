
import { addSales } from '../model/sales';
import { getAllSales } from '../model/sales';
import { getOneSales } from '../model/sales';


export default class salesController{
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

