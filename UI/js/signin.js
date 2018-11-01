window.onload = (() => {
    const hanburgerButton = document.querySelector('.hanburgerButton')  // get hanburger Button
    const close = document.querySelector('.close')  // get close Button
    const navItems = document.querySelector('.nav-items'); //get nav items
    const signupButton = document.querySelector('.signup-button') // get signup button
    const signinButton =document.querySelector('.signin-button') // get signin button
    const displayDasboardContents = document.querySelector('.dasboard-content-toggle-show') // get toggler button
    const dasboardContentDiv = document.querySelector('.dasboard-content') // get dashboard content div
    const closeToggle = document.querySelector('.close-toggle') // get close toggle button
    const dasboardContentMain = document.querySelector('.dasboard-content-main') // get main content div
 
 
    hanburgerButton.addEventListener('click', () => {
        hanburgerButton.className = 'hide';
       close.className ='show-close-button fa fa-times';
       navItems.className = 'show-nav-items';
 
    })
    close.addEventListener('click', () => {
        close.className = 'hide';
        hanburgerButton.className ='fa fa-bars hanburgerButton';
        navItems.className = 'hide';
    })
    
    signinButton.addEventListener('click', (signinEvent) => {
        signinEvent.preventDefault();     
        window.location.href = 'https://xrole.github.io/storeManus/views/adminDashboard.html';
     })
 
     
 })