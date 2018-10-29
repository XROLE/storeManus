import { addAttendants } from '../model/attendants';

class attendants {
    static addAttendants(req, res){
        const { firstName, lastName, email, password } = req.body;
        addAttendants(firstName, lastName, email, password);  // add attendant to attendants table
        return res.status(200).json({
            Success: true,
            Message: 'You have successfully added an attendant',
            attendants: req.body
        });
    }
}

export default attendants;

