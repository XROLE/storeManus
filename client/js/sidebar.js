const dasboardContentDiv = document.querySelector('.dasboard-content'); // get dashboard content div
const dasboardContentMain = document.querySelector('.dasboard-content-main'); // get main content div 
const displayDasboardContents = document.querySelector('.dasboard-content-toggle-show'); // get toggler button 
const closeToggle = document.querySelector('.close-toggle'); // get close toggle button
closeToggle.addEventListener('click', () => {
    closeToggle.className ='hide';
    dasboardContentDiv.className ='dasboard-content';
    dasboardContentMain.className = 'hide';
    displayDasboardContents.className ='fa fa-bars dasboard-content-toggle-show';
});

displayDasboardContents.addEventListener('click', () => {
    dasboardContentDiv.className = 'dasboard-content-increase-with';
    dasboardContentMain.className = 'dasboard-content-main-show';
    displayDasboardContents.className = 'hide';
    closeToggle.className = 'fa fa-times';
});