window.onload = (() => {
    const hanburgerButton = document.querySelector('.hanburgerButton');  // get hanburger Button
    const close = document.querySelector('.close');                      // get close Button
    const navItems = document.querySelector('.nav-items');               //get nav items    
    const signinButton =document.querySelector('.signin-button');        // get signin button
    
    hanburgerButton.addEventListener('click', () => {  // hanburger functionality
        hanburgerButton.className = 'hide';
        close.className ='show-close-button fa fa-times';
        navItems.className = 'show-nav-items';
 
    });
    close.addEventListener('click', () => {  // hanburger close button functionality
        close.className = 'hide';
        hanburgerButton.className ='fa fa-bars hanburgerButton';
        navItems.className = 'hide';
    });
    
    signinButton.addEventListener('click', (signinEvent) => { // handle signin functionality
        signinEvent.preventDefault();    

        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        const data = {email, password};
        
        let url; 
        if(email==='xrolediamond@gmail.com'){ // TOGGLE ATTENDANT URL AND ADMIN URL
            url = 'http://localhost:5000/api/v1/admin/auth/signin';
        }else{
            url = 'http://localhost:5000/api/v1/attendants/auth/signin';
        }
        
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
                        return   window.location.replace('file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/client/views/adminDashboard.html');
                    }                                            
                    return  window.location.replace('file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/client/views/create-sales.html');
                }
            })
            .catch(err => console.error('Error :', err));
    });
});