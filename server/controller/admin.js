
const adminSignIn = (req, res) => {
    return res.status(200).json({
        Success: true,
        User: 'admin',
        Message: 'You are successfully signed in',        
        Token : req.token
    });
};

export default adminSignIn;