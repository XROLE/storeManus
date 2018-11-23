
const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            Success:false,
            Message: 'Unauthorized user access. Please make sure you are signed in'
        });
    }
    return next();
};

export default checkToken;