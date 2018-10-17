import { products } from './data';
import { sales } from './data';

export default class storeDB{
    static getProducts(req, res){  // 1
        return res.status(200).json({
            message: 'ALL PRODUCTS',
            products
        }); 
    }
    static getOneProduct(req, res){  // 2
        const ID = req.params.id;
        return res.status(200).json({
            success: true,
            message: 'Products serverd',
            products: products[ID]
        });
    }

    static getSales(req, res){  //3
        return res.status(200).json({
            message: 'ALL SALES',
            sales
        });
    }

    static getOneSale(req, res){ // 4
        const ID = req.params.id;
        return res.status(200).json({
            success: true,
            sale: sales[ID]
        });
    }

    static postProducts(req, res){  //========================================= not done
            
        var lastIndex = Object.keys(products);        
        products[lastIndex.length + 1] = {
            id: req.body.id, 
            message: req.body.message            
        };
        return res.status(200).json({
            success: true,
            message: 'Product added succesfully',
            Product: req.body
        });
    }
    static postSales(req, res){  // ===========================================not done
        var lastIndex = Object.keys(sales);        
        sales[lastIndex.length + 1] = {
            id: req.body.id, 
            message: req.body.message            
        };
        return res.status(200).json({
            success: true,
            message: 'Sales added succesfully',
            sale: req.body
        });
    }

    static putProducts(req, res){   // =================================== not done
        products[req.params.id] = {
            id: req.params.id,
            message: req.body.message
        };
        return res.status(200).json({
            success: true,
            message: 'Product edited successfully',
            editedProduct: req.body
        });
    }

    static deleteProduct(req, res){  // =================================== not done
        delete products[req.params.id];
        return res.status(200).json({
            success: true,
            message: 'Product deleted succesfully'
        });
    }
}