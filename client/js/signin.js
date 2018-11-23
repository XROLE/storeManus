window.onload = (() => {       
    const signinButton =document.querySelector('.signin-button');        // get signin button
    
    function signInUser(url){ // sign a user in
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        const data = {email, password};
        fetch(url, { // POST DATA TO THE DATABASE
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {                
                alert(res.Message);
                if(res.Success){   // SAVE TOKEN IN LOCAL STORAGE AND REDIRECT APPROPRIATE DASHBOARD
                    localStorage.setItem('accessToken', res.Token); 
                    if(res.User === 'admin'){  
                        return   window.location.href= 'adminDashboard.html';
                    }                                            
                    return  window.location.href= 'create-sales.html';
                }
            })
            .catch(err => console.error('Error :', err));     
    }

    signinButton.addEventListener('click', (signinEvent) => { // handle signin functionality
        signinEvent.preventDefault();
        const email = document.getElementById('signInEmail').value;
        let url; 
        if(email==='xrolediamond@gmail.com'){ // TOGGLE ATTENDANT URL AND ADMIN URL
            url = 'http://localhost:5000/api/v1/admin/auth/signin';
        }else{
            url = 'http://localhost:5000/api/v1/attendants/auth/signin';
        }
        signInUser(url);
    });
});