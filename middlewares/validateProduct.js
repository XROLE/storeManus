import { isNumber, isEmpty} from './validate';

export default class validateProduct{
    static getOneProduct(req, res, next){
        const product_id = req.params.id;       
        if(product_id.length > 3){
            return res.status(400).json({
                success: false,
                message: 'product id is too long'
            });
        }
        if(product_id ===''){
            return res.status(400).json({
                success: false,
                message: 'Please insert product id'
            });
        }
        if(isEmpty(product_id)){
            return res.status(400).json({
                success: false,
                message: 'Please insert product id'
            });
        }

        if(!isNumber(product_id)){
            return res.status(400).json({
                Success: false,
                Message: 'Bad request!, Product id must be valid number'
            });
        }
        return next();
    }
    static postProduct(req, res, next){
        const { name, type, price, category } = req.body;
             
        if(isEmpty((name ||type || price || category )) || isEmpty((name && type && price && category)) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
        return next();
    }
    static editProduct(req, res, next){
        const product_id = req.params.id;
        if(product_id.length > 3){
            return res.status(400).json({
                Success: false,
                Message: 'Product id is too long'
            });
        }
       
        if(isEmpty(product_id)){
            return res.status(400).json({
                success: false,
                message: 'Please insert product id'
            });
        }

        if(!isNumber(product_id)){
            return res.status(400).json({
                Success: false,
                Message: 'Product id must be valid number'
            });
        }
        return next();
    }
    static deleteProduct(req, res, next){
        const product_id = req.params.id;
        if(product_id.length > 3){
            return res.status(401).json({
                Success: false,
                Message: 'Product id is too long'
            });
        }
               
        if(!isNumber(product_id)){
            return res.status(400).json({
                success: false,
                message: 'Product id must be valid number'
            });
        }
        next();
    }

}


