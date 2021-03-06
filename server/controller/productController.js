import { addProduct } from '../model/products';
import { getAllProducts } from '../model/products';
import { getOneProduct } from '../model/products';
import { editProduct } from '../model/products';
import { deleteOneProduct } from '../model/products';
import { getAvailableProducts } from '../model/products';
import { getFinishedProducts } from '../model/products';
import { getCateProduct } from '../model/products';

export default class ProductController{
    static getAvailableProducts(req, res){  // GET ALL PRODUCTS
        getAvailableProducts()
            .then((availableProducts) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'AVAILABLE PRODUCTS',
                    availableProducts
                });
            });         
    }
    static getProducts(req, res){  // GET ALL PRODUCTS
        getAllProducts()
            .then((allProducts) => {
                if(!allProducts.length){
                    return res.status(404).json({
                        Success: true,
                        Message: 'You have not added any product in this store'
                    });
                }
                return res.status(200).json({
                    Success: true,
                    Message: 'ALL PRODUCTS',
                    Products: allProducts
                });
            });         
    }
    static getFinishedProducts(req, res){  // GET ALL PRODUCTS
        getFinishedProducts()
            .then((finishedProducts) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'FINISHED PRODUCTS',
                    finishedProducts
                });
            });         
    }
    static getProductsByCategory(req, res){  // GET ONE PRODUCT
        const category = [req.params.category ];
        getCateProduct(category)
            .then((product) => {
                if(product.length === 0){
                    return res.status(200).json({
                        Success: true,
                        Message: 'There are no products in this category'
                    });
                }
                return res.status(200).json({
                    Success: true,
                    Message: 'Products serverd',
                    category,
                    Product: product
                });
            });
    }
    static getOneProduct(req, res){  // GET ONE PRODUCT
        const ID = [req.params.id ];
        getOneProduct(ID)
            .then((product) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'Products serverd',
                    ID,
                    Product: product
                });
            });
    }
    static postProduct(req, res){   // ============================ POST PRODUCT
        const { name, price, quantity, type, category } = req.body; 
        addProduct(name, price, quantity, type, category)
            .then((response) =>{
                return res.status(200).json({
                    Success: true,
                    Message: 'Product added successfully',
                    response
                });
            });      
    }

    static putProducts(req, res){   //=========================== EDIT PRODUCT 
        const id = req.params.id;
        const name = req.body.name; 
        const price = req.body.price;
        const quantity = req.body.quantity;           
        const type = req.body.type;            
        const category = req.body.category; 
        editProduct(name, price, quantity, type, category, id)
            .then((update) => {             
                return res.status(200).json({
                    Success: true,
                    Message: 'Product edited successfully',
                    editedProduct: update
                });
            });            
    }

    static deleteProduct(req, res){ 
        const ID = [req.params.id];
        deleteOneProduct(ID);        
        return res.status(200).json({
            Success: true,
            Message: 'Product deleted succesfully'
        });
    }
}
