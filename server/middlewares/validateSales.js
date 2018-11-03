import { isNumber, isEmpty} from './validate';

export default class ValidateSales {
    static postSales(req, res, next){
        const {attendant, name, price, quantity, type, category, total } = req.body;
        if(isEmpty((attendant, name || price || quantity || type || category || total)) || isEmpty((attendant, name && price && quantity && type && category, total)) ){
            return res.status(400).json({
                Success: false,
                Message: 'No empty field is allowed. Please make sure you fill all fields'
            });
        }
 
        if(!isNumber(price || quantity || total)){
            return res.status(400).json({
                Success: false,
                Message: 'Only numbers are allowed in the Price and Quantity field'
            });
        }
        return next();
    }
    static getOneSales(req, res, next){
        const product_id = req.params.id;       
        if(product_id.length > 3){
            return res.status(400).json({
                Success: false,
                Message: 'Sales id is too long'
            });
        }       
        if(!isNumber(product_id)){
            return res.status(400).json({
                Success: false,
                Message: 'Sales id must be valid number'
            });
        }
        return next();
    }
}
