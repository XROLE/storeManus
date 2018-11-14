import jwt from 'jsonwebtoken';

class AdminToken{
    static createToken(req, res, next){
        const AdminEmail = process.env.AdminEmail;
        const AdminPassword = process.env.AdminPassword;      
        const { email, password } = req.body;        
        if(!(email === AdminEmail && password === AdminPassword)){
            return res.status(400).json({
                Success: false,
                Message: 'User email or password is incorrect'
            });
        } 
        // CREATE TOKEN
        const payload = {email, password };
        const secret = process.env.jwt_secret;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });  // generating jwt token 
        req.token = token;                                             // save token in request body
        return next();
    }
    
}

export default AdminToken;
