window.onload = (() => {
    const hanburgerButton = document.querySelector('.hanburgerButton');  // get hanburger Button
    const close = document.querySelector('.close');  // get close Button
    const navItems = document.querySelector('.nav-items'); //get nav items    
    const signinButton =document.querySelector('.signin-button'); // get signin button
    // const displayDasboardContents = document.querySelector('.dasboard-content-toggle-show'); // get toggler button
    // const dasboardContentDiv = document.querySelector('.dasboard-content'); // get dashboard content div
    // const closeToggle = document.querySelector('.close-toggle'); // get close toggle button
    // const dasboardContentMain = document.querySelector('.dasboard-content-main'); // get main content div
 
 
    hanburgerButton.addEventListener('click', () => {
        hanburgerButton.className = 'hide';
        close.className ='show-close-button fa fa-times';
        navItems.className = 'show-nav-items';
 
    });
    close.addEventListener('click', () => {
        close.className = 'hide';
        hanburgerButton.className ='fa fa-bars hanburgerButton';
        navItems.className = 'hide';
    });
    
    signinButton.addEventListener('click', (signinEvent) => {
        signinEvent.preventDefault();    

        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        const data = {email, password};
       
        const url = 'http://localhost:5000/api/v1/admin/auth/signin';
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
                if(res.Success){   // SAVE TOKEN IN LOCAL STORAGE AND REDIRECT TO HOME PAGE
                    localStorage.setItem('accessToken', res.Token);                                             
                    window.location.replace("file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/client/views/adminDashboard.html")
                }
            })
            .catch(err => console.error('Error :', err));
    });
});