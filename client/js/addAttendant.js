window.addEventListener('load', loadAddAttButton); 

//================================================= TOKEN IF PRESENT
let token='';
if(localStorage.getItem('accessToken') !== null){
    token = `Bearer ${localStorage.getItem('accessToken')}`;
}

//===============================================LOAD ADD ATTENDANT BUTTON
function loadAddAttButton(){  
    const addatt = document.querySelector('#add-attendant-button');
    addatt.addEventListener('click', (e) =>{
        e.preventDefault();
        return registerAttendant();          
            
    });

}

//================================================== REGISTER AN ATTENDANT
function registerAttendant(){    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
        
    const data = {firstName, lastName, email};
    let url ='http://localhost:5000/api/v1/attendants/auth/register';        
    fetch(url, { // POST DATA TO THE DATABASE
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token,
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => { 
            if(res.Success){   // SAVE TOKEN IN LOCAL STORAGE AND REDIRECT APPROPRIATE DASHBOARD
                alert(`Proceed to with this password to update your account ${res.password}`);                                           
                return  location.reload();
            }
            alert(res.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}