
import { sales } from '../model/data';

export default class salesController{
    static getSales(req, res){  // Get all sales
        return res.status(200).json({
            message: 'ALL SALES',
            sales
        }); 
    }
    static getOneSale(req, res){ // Get single sales
        const ID = req.params.id;
        return res.status(200).json({
            success: true,
            message: 'Single sale',
            ID,
            sale: sales[ID]
        });
    }
    static postSales(req, res){  // Post sales
        var lastIndex = Object.keys(sales);        
        sales[lastIndex.length + 1] = {
            id: req.body.id, 
            Name: req.body.Name,            
            Type: req.body.Type,            
            Category: req.body.Category,            
            Date: req.body.Date                  
        };
        return res.status(200).json({
            success: true,
            message: 'Sales added succesfully',
            sale: req.body
        });
    }

    

    static deleteProduct(req, res){  
        delete products[req.params.id];
        return res.status(200).json({
            success: true,
            message: 'Product deleted succesfully'
        });
    }
}