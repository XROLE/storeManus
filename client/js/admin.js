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
    // ADD PRODUCT FUNCTIONALITY
    const loc = 'file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/client/views/admin-add-products.html';
    const add = document.querySelector('#add-product-button');
    if(location.href === loc){
        add.addEventListener('click', (e) =>{
          
            e.preventDefault();
          
            const name = document.getElementById('product-Name').value.trim();
            const price = document.getElementById('product-Price').value.trim();
            const quantity = document.getElementById('product-Quantity').value.trim();
            const type = document.getElementById('product-Type').value.trim();
            const category = document.getElementById('product-Category').value.trim();  
            const data = {name, price, quantity, type, category }; 

            let url ='http://localhost:5000/api/v1/products';        
            fetch(url, { // POST DATA TO THE DATABASE
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'x-access-token': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if(res.Success){   // SAVE TOKEN IN LOCAL STORAGE AND REDIRECT APPROPRIATE DASHBOARD                                                                 
                        return  location.reload();
                    }
                    alert(res.Message);
                    return;
                })
                .catch(err => console.error('Error :', err));
        });
                
                
    }
    // ADD ATTENDANT
    const atloc = 'file:///C:/Users/XROLE%20VALSIDO%20DIAMON/Desktop/Apps/storeManus/client/views/admin-add-attendant.html';
    const addatt = document.querySelector('#add-attendant-button');
    if(location.href === atloc){
        addatt.addEventListener('click', (e) =>{
          
            e.preventDefault();
             
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            const data = {firstName, lastName, email};
            let url ='http://localhost:5000/api/v1/attendants/auth/register';        
            fetch(url, { // POST DATA TO THE DATABASE
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'x-access-token': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => { 
                    if(res.Success){   // SAVE TOKEN IN LOCAL STORAGE AND REDIRECT APPROPRIATE DASHBOARD
                        alert(`Proceed to with this password to update your account ${res.password}`);                                           
                        return  location.reload();
                    }
                    alert(res.Message);
                    return;
                })
                .catch(err => console.error('Error :', err));
        });
                
                
    }
});
// ===================== ALL PRODUCTS SECTION ====================================

function populateProductTable(data){    // Populate table with details from database              
    for(i = 0; i< data.Products.length; i++){                    
        const products =  `<tr>
        <td>${data.Products[i].id}</td>
        <td>${data.Products[i].name}</td>
        <td>${data.Products[i].type}</td>
        <td>${data.Products[i].category}</td>
        <td>${data.Products[i].date}</td>
        </tr>`;
        document.getElementById('tableBody').innerHTML += products;
    }
    return;
}
function populateAvalaibleProductTable(data){
    for(let i = 0; i< data.availableProducts.length; i++){                    
        const products =  `<tr>
        <td>${data.availableProducts[i].name}</td>
        <td>${data.availableProducts[i].quantity}</td>
        <td>${data.availableProducts[i].type}</td>
        <td>${data.availableProducts[i].category}</td>
        <td>${data.availableProducts[i].date}</td>
        </tr>`;
        document.getElementById('tableBody').innerHTML += products;
    }
    return;
}
function populateFinishedProductTable(data){
    for(let i = 0; i< data.finishedProducts.length; i++){                    
        const products =  `<tr>
        <td>${data.finishedProducts[i].name}</td>       
        <td>${data.finishedProducts[i].type}</td>
        <td>${data.finishedProducts[i].category}</td>        
        </tr>`;
        document.getElementById('tableBody').innerHTML += products;
    }
    return;
}
function AllProducts(){  // Get products and populate products table            
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
                    return document.getElementById('allProductContainer').innerHTML += table;               
                }   
            
                createTable();   // CREATE TABLE  
                // const man = result;
                // console.log('This is the result', man);
                        
                return  populateProductTable(result);  //POPULATE TABLE
            
            
            }            
            alert(result.Message);
            return window.location.href = './signin.html';
        })
        .catch(err => console.error('Error :', err));
     
}

//======================= AVAILABLE PRODUCTS SECTION
function AvailableProducts(){
    const url = 'http://localhost:5000/api/v1/products/available';
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
                function createAvailableProductTable(){    //create all product table 
                    const table = `
                    <table id="avalaible-products-table">
                            <thead>
                                <tr>
                                    <th colspan="4" class="table-head"><i class="fab fa-accessible-icon"></i> &nbsp; AVAILABLE PRODUCTS</th>
                                </tr>
                            </thead>
                            <tbody id='tableBody'>
                                <tr>
                                    <th>Names</th>
                                    <th>Quantity</th>
                                    <th>Types</th>
                                    <th>Categories</th>                                    
                                </tr>                                                                
                            </tbody>                            
                        </table>` ;               
                    return document.getElementById('availableProductsContainer').innerHTML += table;               
                }   
            
                createAvailableProductTable();   // CREATE TABLE  
                // const man = result;
                // console.log('This is the result', man);
                        
                return  populateAvalaibleProductTable(result);  //POPULATE TABLE
            
            
            }            
            alert(result.Message);
            return window.location.href = './signin.html';
        })
        .catch(err => console.error('Error :', err));
     
}
//======================= FINISHED PRODUCTS SECTION
function FinishedProducts(){
    const url = 'http://localhost:5000/api/v1/products/finished';
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
                function createFinishedProductTable(){    //create all product table 
                    const table = `
                    <table id="finished-products">
                            <thead>
                                <tr>
                                    <th colspan="3" class="table-head"> Finished Product</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                <tr>
                                    <th>Name</th>                                 
                                    <th>Type</th>
                                    <th>Category</th>
                                </tr>
                        </table>    ` ;               
                    return document.getElementById('finishedProductsContainer').innerHTML += table;               
                }   
            
                createFinishedProductTable();   // CREATE TABLE  
                // const man = result;
                // console.log('This is the result', man);
                        
                return  populateFinishedProductTable(result);  //POPULATE TABLE
            
            
            }            
            alert(result.Message);
            return window.location.href = './signin.html';
        })
        .catch(err => console.error('Error :', err));
     
}


