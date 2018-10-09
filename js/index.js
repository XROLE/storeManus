window.onload = (() => {
   const hanburgerButton = document.querySelector('.hanburgerButton')  // get hanburger Button
   const close = document.querySelector('.close')  // get close Button
   const navItems = document.querySelector('.nav-items'); //get nav items
   const signupButton = document.querySelector('.signup-button') // get signup button
   const signinButton =document.querySelector('.signin-button') // get signin button

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

   signupButton.addEventListener('click', (signupEvent) => {
       signupEvent.preventDefault();
       window.location.href = 'file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/views/adminDashboard.html';
   })

   signinButton.addEventListener('click', (signinEvent) => {
       signinEvent.preventDefault();
       alert('I am a chosen one');
       window.location.href = 'file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/views/adminDashboard.html';
       })
})