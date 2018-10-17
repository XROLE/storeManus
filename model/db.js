import { products } from './data';
import { sales } from './data';

export default class storeDB{
    static getProducts(req, res){
        return res.status(200).json({
            message: 'ALL PRODUCTS',
            products
        }); 
    }
    static getOneProduct(req, res){  // not done 
     console.log('  url params: ', req.params);
        return res.status(200).json({
            success: true,
            message: 'Products serverd',
            products: products[3],
            ProductNumber: req.params
        });
    }

    static getSales(req, res){
        return res.status(200).json({
            message: 'ALL SALES',
            sales
        });
    }

    static getOneSale(req, res){ // ===================================not done
        return res.send('class one sale');
    }

    static postProducts(req, res){
        products.push( req.body );      
        return res.status(200).json({
            success: true,
            message: 'Product added succesfully',
            Product: req.body
        });
    }
    static postSales(req, res){
        sales.push(req.body);
        return res.status(200).json({
            success: true,
            message: 'Sales added succesfully',
            sale: req.body

        });
    }

    static putProducts(req, res){   // =================================== not done
        return res.send('class edit products');
    }

    static deleteProduct(req, res){  // =================================== not done
        return res.send('class delete product');
    }
}