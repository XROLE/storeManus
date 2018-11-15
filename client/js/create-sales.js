window.onload = (() => {
    const hanburgerButton = document.querySelector('.hanburgerButton');  // get hanburger Button
    const close = document.querySelector('.close');  // get close Button
    const navItems = document.querySelector('.nav-items'); //get nav items
    
    
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

    // console.log('saved token from local storage', localStorage.getItem('accessToken'));
 
});