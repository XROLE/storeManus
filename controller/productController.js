
import { products } from '../model/data';
import { addProduct } from '../model/products';

export default class productController{
    static getProducts(req, res){  // GET ALL PRODUCTS
        return res.status(200).json({
            message: 'ALL PRODUCTS',
            products
        }); 
    }
    static getOneProduct(req, res){  // GET ONE PRODUCT
        const ID = req.params.id;
        return res.status(200).json({
            Success: true,
            Message: 'Products serverd',
            ID,
            Product: products[ID]
        });
    }
    static postProduct(req, res){   // ============================ POST PRODUCT
        const { Name, Type, Price, Category } = req.body; 
        console.log(req.body);
        addProduct(Name, Type, Price, Category)
            .then((response) =>{
                return res.status(200).json({
                    Success: true,
                    Message: 'Product added successfully',
                    response
                });
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
            Success: true,
            Message: 'Product edited successfully',
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