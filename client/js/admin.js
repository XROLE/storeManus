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

    
});
function populateProductTable(data){    // Populate table with details from database              
    for(i = 0; i< data.Products.length; i++){                    
        const products =  `<tr>
        <td>${data.Products[i].id}</td>
        <td>${data.Products[i].name}</td>
        <td>${data.Products[i].type}</td>
        <td>${data.Products[i].category}</td>
        <td>${data.Products[i].date}</td>
        </tr>`
       document.getElementById('tableBody').innerHTML += products;
    }
}
function getAllProducts(){    
       
    const url = 'http://localhost:5000/api/v1/products';
    fetch(url, { // FETCH PRODUCTS
        method: 'GET',        
        headers: {
            'Accept': 'application/json, text/plain, */*',          
            'x-access-token': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {       
        if(result.Success){           
            document.getElementById('shopping-cart').className='hide';   // hide shopping cart icon
            function createTable(){    //create all product table 
                const table = `
                <table class="all-products-table" id="all-products-table">
                <thead>
                <tr>
                <th colspan="5" class="table-head"> <i class="fas fa-cookie-bite"></i> &nbsp;ALL PRODUCTS</th>
                </tr>
                </thead>
                <tbody id='tableBody'>
                <tr>
                <th>ID</th>
                <th>  Name</th>
                <th>Type</th>
                <th>Categories</th>
                <th>Date Added</th>
                </tr>                                                                
                </tbody>
                </table>               
                ` ;               
                return document.getElementById('testing').innerHTML += table;               
            };   
            
            createTable();   // CREATE TABLE  
            // const man = result;
            // console.log('This is the result', man);
                        
            return  populateProductTable(result)  //POPULATE TABLE
            
            
        };            
        alert(result.Message);
       return window.location.href = './signin.html';
    })
    .catch(err => console.error('Error :', err));
     
}

