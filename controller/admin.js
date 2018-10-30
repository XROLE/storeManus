
const adminSignIn = (req, res) => {
    const adminEmail = 'xrolediamond@gmail.com';
    const adminPassword = 'myadmin2634';
    const { email, password } = req.body;
    if(!(email === adminEmail && password === adminPassword)){
        return res.status(401).json({
            Success: false,
            Message: 'User email or password is incorrect'
        });
    }
    return res.status(200).json({
        Success: true,
        Message: 'You are successfully signed in',
        details: req.body
    });
};

export default adminSignIn;