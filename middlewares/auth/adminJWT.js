import jwt from 'jsonwebtoken';

class AdminToken{
    static createToken(req, res, next){
        const email = 'xrolediamond@gmail.com';
        const password = 'xrolevalsido2634';
        const { mail, pass } = req.body;
        if(!(mail === email && password === pass)){
            return res.status(401).json({
                Success: false,
                Message: 'User email or password is incorrect'
            });
        }
        // CREATE TOKEN
        const payload = {email, pass };
        const secret = process.env.jwt_secret;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });  // generating jwt token 
        req.token = token;
        return next();
    }
    static checkToken(req, res, next){
        const secret = process.env.jwt_secret;
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                Success:false,
                Message: 'Unauthorized user access'
            });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                return res.status(500).json({
                    auth: false,
                    Message: 'Failed to authenticate token.'
                });
            }
            if(!decoded.email === 'xrolediamond@gmail.com'){                            
                return res.status(500).json({
                    auth: false,
                    Message: 'Unauthorize access!. Only the admin can access this route'
                });
            }
            console.log(decoded);            
        });
        return next();
    }
}

export default AdminToken;
