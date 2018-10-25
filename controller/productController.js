
import { products } from '../model/data';

export default class productController{
    static getProducts(req, res){  // Get all products
        return res.status(200).json({
            message: 'ALL PRODUCTS',
            products
        }); 
    }
    static getOneProduct(req, res){  // Get one product
        const ID = req.params.id;
        return res.status(200).json({
            success: true,
            message: 'Products serverd',
            ID,
            Product: products[ID]
        });
    }
    static postProduct(req, res){   // Post product
        const { Name, Type, Category } = req.body;
        var lastIndex = Object.keys(products);        
        products[lastIndex.length + 1] = {
            id: req.body.id, 
            Name: req.body.Name,            
            Type: req.body.Type,            
            Category: req.body.Category,            
            Date: req.body.Date            
        };
        return res.status(200).json({
            success: true,
            Message: 'Product added successfully',
            Name,
            Type,
            Category 
        });
    }

    static putProducts(req, res){   // Edit product 
        products[req.params.id] = {
            id: req.params.id,
            Name: req.body.Name,            
            Type: req.body.Type,            
            Category: req.body.Category,            
            Date: req.body.Date    
        };
        return res.status(200).json({
            success: true,
            message: 'Product edited successfully',
            editedProduct: req.body
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