window.onload = (() => {
    // SET TOKEN
    let token='';
    if(localStorage.getItem('accessToken') !== null){
        token = `Bearer ${localStorage.getItem('accessToken')}`;
    } 
    // GET ID 
    const decodeAttendantId = (token) => {
        const decoded = jwt_decode(token);        
        return decoded.id; 
    };

    decodeAttendantId(token);
    // CHECK FILE SIZE
    function isLargeFileSize(file){
        if(file > 70000){
            return true;
        }
        return false;
    }    
    document.getElementById('updateProfileButton').addEventListener('click', (e) => {
        e.preventDefault();
        updateProfile();      
        return;
    });
    const updateProfile = () =>{
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
        const id = decodeAttendantId(token);    
        let profilepics;
        
      
        // convert profile pix to url and assign it to profilepics variable
        const reader = new FileReader();
        reader.readAsDataURL(document.querySelector('input[type=file]').files[0]); 
        console.log(document.querySelector('input[type=file]').files[0].size);  
        reader.onload = function () {
            profilepics = reader.result;
            const updateData = { firstName, lastName, email, phoneno, gender, profilepics, password, confirmpassword }; 
            const url = `http://localhost:5000/api/v1/attendants/${id}`;
    
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
                    return window.location.href = './create-sales.html';        
                
                })
                .catch(err => console.error('Error :', err));     
    
        };
    };
});




