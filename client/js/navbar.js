
const hanburgerButton = document.querySelector('.hanburgerButton');  // get hanburger Button
const close = document.querySelector('.close');  // get close Button
const navItems = document.querySelector('.nav-items'); //get nav items


function openNav(){
        hanburgerButton.className = 'hide';
        close.className ='show-close-button fa fa-times';
        navItems.className = 'show-nav-items';
}
    
function closeNav(){
        close.className = 'hide';
        hanburgerButton.className ='fa fa-bars hanburgerButton';
        navItems.className = 'hide';
}

function signOut(){
    localStorage.removeItem('accessToken');
    return location.href='signin.html';
}