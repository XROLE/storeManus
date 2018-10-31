import { addAttendants } from '../model/attendants';
// import { getOneAttendant } from '../model/attendants';

class attendants {
    static addAttendants(req, res){
        const { firstName, lastName, email, password } = req.body;
        addAttendants(firstName, lastName, email, password)
            .then((addedAttendant) => {
                return res.status(200).json({
                    Success: true,
                    Message: 'You have successfully added an attendant',
                    attendants: addedAttendant
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
    static signInAttendants(req, res){
        const Token = req.token;       
        return res.status(200).json({
            Success: true,
            Message: 'You are signed in successfuly',
            Token
        });
    }
}

export default attendants;

