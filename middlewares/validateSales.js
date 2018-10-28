import { isNumber, isValidNum, isEmpty} from './validate';

export default class validateSales {
    static postSales(req, res, next){
        const { Name, Type, Category } = req.body;
        const  Dated = req.body.Date;
        if(isEmpty((Name || Type || Category || Dated )) || isEmpty((Name && Type && Category && Dated)) ){
            return res.status(400).json({
                success: false,
                message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }

        if(!isValidNum(Dated)){
            return res.status(400).json({
                success: false,
                message: 'Date is invalid. Date lenght should be 13'
            });
        }

        if(!isNumber(Dated)){
            return res.status(400).json({
                success: false,
                message: 'Only numbers are allowed in the Date field'
            });
        }
        return next();
    }
    static getOneSales(req, res, next){
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
                success: false,
                message: 'Product id must be valid number'
            });
        }
        return next();
    }
}
