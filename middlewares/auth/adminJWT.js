import jwt from 'jsonwebtoken';

class AdminToken{
    static createToken(req, res, next){
        const adminEmail = 'xrolediamond@gmail.com';
        const adminPassword = 'myadmin2634';
        const { email, password } = req.body;
        if(!(email === adminEmail && password === adminPassword)){
            return res.status(401).json({
                Success: false,
                Message: 'User email or password is incorrect'
            });
        }
        // CREATE TOKEN
        const payload = {adminEmail, adminPassword };
        const secret = process.env.jwt_secret;
        const token = jwt.sign(payload, secret);  // generating jwt token
        req.token = token;
        return next();
    }
    static checkToken(req, res){
        console.log('Token :', req.headers.token);
        if(!req.token){
            return res.status(400).json({
                Success:false,
                Message: 'Unauthorized user access. Please sign into to be able to view this page'
            });
        }
        return res.status(200).json({
            Success: true, 
            Message: 'Product added successfully'
        });
    }
}

export default AdminToken;