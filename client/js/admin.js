

window.onload = (() => { 
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
                    'x-access-token': token,
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
                    'x-access-token': token,
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

// TOKEN SECTION
let token='';
if(localStorage.getItem('accessToken') !== null){
    token = `Bearer ${localStorage.getItem('accessToken')}`;
} 

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
function populateAttendantsDiv(data){
    for(let i = 0; i< data.attendants.length; i++){                    
        const attendant =  `<tr>
            <a href="att-pro-page.html">
                <div class="attendant-profile-div">
                    <img src="${data.attendants[i].profilepics}" alt="attendant avatar" class="attendant-profile-image">
                    <div class=" attendant-profile-info-div ">
                        <p>Name: ${data.attendants[i].firstname} ${data.attendants[i].lastname} <span style="display: block">Click to view profile</span> </p>                                                                       
                    </div>
                </div>
            </a>`;
        document.getElementById('all-attendant-div').innerHTML += attendant;
    }
    return;
}
function AllProducts(){  // Get products and populate products table          
    const url = 'http://localhost:5000/api/v1/products';
    fetch(url, { // FETCH PRODUCTS
        method: 'GET',        
        headers: {
            'Accept': 'application/json, text/plain, */*',          
            'x-access-token': token,
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
                    return document.getElementById('allProductContainer').innerHTML = table;               
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
    console.log(localStorage.getItem('accessToken'));
    fetch(url, { // FETCH PRODUCTS
        method: 'GET',        
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token,
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
                    return document.getElementById('availableProductsContainer').innerHTML = table;               
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
            'x-access-token':token,
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
                    return document.getElementById('finishedProductsContainer').innerHTML = table;               
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

//================= SIGN OUT

//======================= GET ALL ATTENDANTS
function getAttendants(){
    const url = 'http://localhost:5000/api/v1/attendants';
    fetch(url, { // FETCH PRODUCTS
        method: 'GET',        
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'x-access-token':token,
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(result => {       
            if(result.Success){
                function createAttendantCards(){    //Create display for each Attendant 
                    const card = `
                    <p ><i class="fas fa-users"></i> &nbsp;ALL ATTENDANTS</p>
                    <div id="all-attendant-div">                            
                                                                                
                    </div> `    ;             
                    return document.getElementById('all-attendant-div-frame').innerHTML = card;               
                }
                createAttendantCards();   // CREATE ATTENDANT DISPLAY CARD
                return  populateAttendantsDiv(result);  //POPULATE TABLE
            }            
            alert(result.Message);
            return window.location.href = './signin.html';
        })
        .catch(err => console.error('Error :', err));
     
}


