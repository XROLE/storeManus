window.onload = (() => {
    const hanburgerButton = document.querySelector('.hanburgerButton');  // get hanburger Button
    const close = document.querySelector('.close');  // get close Button
    const navItems = document.querySelector('.nav-items'); //get nav items
    const displayDasboardContents = document.querySelector('.dasboard-content-toggle-show'); // get toggler button
    const dasboardContentDiv = document.querySelector('.dasboard-content'); // get dashboard content div
    const closeToggle = document.querySelector('.close-toggle'); // get close toggle button
    const dasboardContentMain = document.querySelector('.dasboard-content-main'); // get main content div
 
 
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
 
    displayDasboardContents.addEventListener('click', () => {
        dasboardContentDiv.className = 'dasboard-content-increase-with';
        dasboardContentMain.className = 'dasboard-content-main-show';
        displayDasboardContents.className = 'hide';
        closeToggle.className = 'fa fa-times';
    });
    closeToggle.addEventListener('click', () => {
        closeToggle.className ='hide';
        dasboardContentDiv.className ='dasboard-content';
        dasboardContentMain.className = 'hide';
        displayDasboardContents.className ='fa fa-bars dasboard-content-toggle-show';
    });

    console.log('saved token from local storage', localStorage.getItem('accessToken'));
 
});