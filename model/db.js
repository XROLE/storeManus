// import { products } from './data';
// import { sales } from './data';

// export default class storeDB{
//     static getProducts(req, res){  // 1
//         return res.status(200).json({
//             message: 'ALL PRODUCTS',
//             products
//         }); 
//     }
//     static getOneProduct(req, res){  // 2
//         const ID = req.params.id;
//         return res.status(200).json({
//             success: true,
//             message: 'Products serverd',
//             ID,
//             Product: products[ID]
//         });
//     }

//     static getSales(req, res){  //3
//         return res.status(200).json({
//             message: 'ALL SALES',
//             sales
//         });
//     }

//     static getOneSale(req, res){ // 4
//         const ID = req.params.id;
//         return res.status(200).json({
//             success: true,
//             message: 'Single sale',
//             ID,
//             sale: sales[ID]
//         });
//     }

//     static postProducts(req, res){  
            
//         var lastIndex = Object.keys(products);        
//         products[lastIndex.length + 1] = {
//             id: req.body.id, 
//             Name: req.body.Name,            
//             Type: req.body.Type,            
//             Category: req.body.Category,            
//             Date: req.body.Date            
//         };
//         return res.status(200).json({
//             success: true,
//             message: 'Product added succesfully',
//             Product: req.body
//         });
//     }
//     static postSales(req, res){  
//         var lastIndex = Object.keys(sales);        
//         sales[lastIndex.length + 1] = {
//             id: req.body.id, 
//             Name: req.body.Name,            
//             Type: req.body.Type,            
//             Category: req.body.Category,            
//             Date: req.body.Date                  
//         };
//         return res.status(200).json({
//             success: true,
//             message: 'Sales added succesfully',
//             sale: req.body
//         });
//     }

//     static putProducts(req, res){  
//         products[req.params.id] = {
//             id: req.params.id,
//             Name: req.body.Name,            
//             Type: req.body.Type,            
//             Category: req.body.Category,            
//             Date: req.body.Date    
//         };
//         return res.status(200).json({
//             success: true,
//             message: 'Product edited successfully',
//             editedProduct: req.body
//         });
//     }

//     static deleteProduct(req, res){  
//         delete products[req.params.id];
//         return res.status(200).json({
//             success: true,
//             message: 'Product deleted succesfully'
//         });
//     }
// }