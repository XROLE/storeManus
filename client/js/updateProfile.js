//========================================================== LOAD UPDATE PROFILE BUTTON 
window.addEventListener('load', loadUpdateProfileButton); 


//=========================================================== lOAD BUTTON AND ADD UPDATE PROFILE FUNCTIONALITY
function loadUpdateProfileButton(){ 
    const decoded = jwt_decode(token);   
    fillAttendantInfo();  
    document.getElementById('updateProfileButton').addEventListener('click', (e) => {
        e.preventDefault();
        updateProfile();      
        return;
    });
}


//============================================================ UPDATE ATTENDANT PROFILE
const updateProfile = () =>{ 
    const decoded = jwt_decode(token);
    if(isLargeFileSize(document.querySelector('input[type=file]').files[0].size)){
        return alert('File size is too large. File size should not be more than 70kb');
    }
    
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const phoneno = document.querySelector('#phoneno').value;
    const gender = document.querySelector('#gender').value;    
    const password = document.querySelector('#password').value;    
    const confirmpassword = document.querySelector('#confirmpassword').value; 
    let profilepics;
    
  
    // convert profile pix to url and assign it to profilepics variable
    const reader = new FileReader();
    reader.readAsDataURL(document.querySelector('input[type=file]').files[0]);      
    reader.onload = function () {
        profilepics = reader.result;
        const updateData = { firstName, lastName, email, phoneno, gender, profilepics, password, confirmpassword }; 
        const url = `http://localhost:5000/api/v1/attendants/${decoded.id}`;

        fetch(url, { // POST ATTENDANT DATA
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'x-access-token': token,
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {       
                if(!result.Success){
                    alert(result.Message);    
                    return;          
                }  
                alert(result.Message);          
                return window.location.href = './signin.html';        
            
            })
            .catch(err => console.error('Error :', err));     

    };
};

// SET TOKEN IF AVAILABLE
let token='';
if(localStorage.getItem('accessToken') !== null){
    token = `Bearer ${localStorage.getItem('accessToken')}`;
}

//  CHECK FOR LARGE FILES 
function isLargeFileSize(file){
    if(file > 70000){
        return true;
    }
    return false;
}   
//  FILL ATTENDANTS INFO FROM TOKEN
const fillAttendantInfo = () => {
    const decoded = jwt_decode(token);
    document.querySelector('#firstName').value= decoded.firstname;
    document.querySelector('#lastName').value= decoded.lastname;
    document.querySelector('#email').value= decoded.email; 
    document.querySelector('#phoneno').value= decoded.phoneno;
    document.querySelector('#fullName').innerHTML= `${decoded.firstname} ${decoded.lastname}`;
    document.getElementById('profileAvatar').src= decoded.profilepics;
    return;
};










