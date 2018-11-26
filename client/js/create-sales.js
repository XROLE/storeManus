//GLOBAL VARIABLES 
let productID; 
let productType;
let edit;
let editItemIndex;

// SET TOKEN IF PRESENT
let token='';
if(localStorage.getItem('accessToken') !== null){
    token = `Bearer ${localStorage.getItem('accessToken')}`;
}
const cartItem = [];

//========================================================== POPULATE CATEGORY AND ATTENDANT FIELDS 
function pop_cate_and_Att_Fields (){
    getAvailableProductsCategories();  // 
    const decoded = jwt_decode(token);    
    document.querySelector('#fullName').innerHTML= `${decoded.firstname} ${decoded.lastname}`;
    document.getElementById('profileAvatar').src= decoded.profilepics;      
    return;
}
pop_cate_and_Att_Fields();

// =================================================================================== POPULATE PRODUCT FIELD
document.getElementById('availableProCate').addEventListener('change', popProducts); 

function popProducts(){
    const selectedCategory = document.getElementById('availableProCate').value;
    popProductselectedCate(selectedCategory);
}
function popProductselectedCate(selectedCate){   
    const url = 'http://localhost:5000/api/v1/products/available';    
    fetch(url, { 
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
                const cateProducts = result.availableProducts.filter((product) => product.category === selectedCate);
                const productArray = cateProducts.map((products) => products.name);
                document.getElementById('productField').innerHTML = '<option value="select product">--Select Product</option>'; 
                productArray.forEach((product) => {
                    document.getElementById('productField').innerHTML += `<option value=${product}>${product}</option>`;
                });          
                return;  
            }            
            alert(result.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}

//=========================================================== GET AVAILABLE PRODUCTS CATEGORIES FROM DATABASE
function getAvailableProductsCategories(){
    const url = 'http://localhost:5000/api/v1/products/available';    
    fetch(url, { 
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
                databaseResult = result.availableProducts;                
                const allCate = result.availableProducts.map((obj) => obj.category);
                const uniqueCate = new Set(allCate.sort());
                const allCateArray = [...uniqueCate];               
                allCateArray.forEach((cate) => {
                    document.getElementById('availableProCate').innerHTML += `<option value="${cate}"> ${cate}</option>`;
                });   
                return;  
            }            
            alert(result.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
     
}

// ========================================================== POPULATE PRODUCT PRICE
document.getElementById('productField').addEventListener('change', popPrice);
function popPrice(){
    const selectedProduct = document.getElementById('productField').value;
    popSelectedProductPrice(selectedProduct);
}
function popSelectedProductPrice(selectedProduct){
    const url = 'http://localhost:5000/api/v1/products/available';    
    fetch(url, { 
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
                const productArray = result.availableProducts.filter((product) => product.name === selectedProduct);  
                const price = productArray[0].price;
                productID = productArray[0].id;
                productType = productArray[0].type;                
                document.getElementById('price').value = price;
                return;  
            }            
            alert(result.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}
//========================================================= CALCULATE TOTAL
document.getElementById('quantity').addEventListener('change', addUnitTotal);
function addUnitTotal(){
    const qty = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const unitTotal = qty * price;
    
    return document.getElementById('unitTotal').value = `${unitTotal}`;
}

// ================================================================ ADD TO CART FUNCTIONALITIES
document.getElementById('addToCart').addEventListener('click', addToCart);
function addToCart(e){ // Add sales to cart
    document.getElementById('cart').innerHTML = '';                
    e.preventDefault();
    addCartItem();
    cartTotal();
    clearField();
    displayCartItems();  
}

function addCartItem(){
    if(edit){
        return editCartItem(); 
    }
    const category = document.getElementById('availableProCate').value.trim();
    const product = document.getElementById('productField').value.trim();
    const price = document.getElementById('price').value.trim();
    const qty = document.getElementById('quantity').value.trim();
    const subTotal = document.getElementById('unitTotal').value.trim(); 
    const data = {category, product, price, qty, subTotal, type: productType, id: productID};
    if(category === '' || product == '' || price == '' || qty == '' || subTotal == ''){
        return alert('Please fill all field before adding to cart'); 
    }    
    cartItem.push(data);    
    productType = undefined;
    productID = undefined;
}
function displayCartItems(){
    cartItem.forEach((itemArray, index) => {
        const item = `<tr class ="addedItem">
                    <td >${index + 1}</td>
                    <td> ${itemArray.product}</td>
                    <td>${itemArray.category}</td>
                    <td>${itemArray.qty}</td>
                    <td>${itemArray.price}</td>
                    <td id='subTotal' value=${itemArray.subTotal}>${itemArray.subTotal}</td>
                    <td><button  class="edit-cart-item  link" id='edit' value=${index + 1}>Edit</button></td>
                    <td><button class="delete-cart-item link" id='delete' value=${index + 1} >Del</button></td>
                </tr> `;
        document.getElementById('cart').innerHTML += item;                
    });
}
displayCartItems();
function cartTotal(){
    if(cartItem.length > 0){
        const subtalArray = cartItem.map(item => parseInt(item.subTotal));
        const total = subtalArray.reduce((total, subtotal) => total + subtotal);
        document.getElementById('total').innerHTML=`# ${total}`; 
    }
}
function clearField(){ // Clear create sales input fields
    document.getElementById('availableProCate').value = '';
    document.getElementById('productField').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('unitTotal').value = '';
}

//=============================================================== EDIT AND DELETE FUNCTIONALITIES

function deleteCartItem(e){
    e.preventDefault();
    const deleteItemIndex = e.target.value -1;
    const item = cartItem[deleteItemIndex].product.toUpperCase();
    if(confirm(`Click OK to delet ${item}`)){
        cartItem.splice(deleteItemIndex, 1);
        document.getElementById('cart').innerHTML ='';
        displayCartItems();  
        cartTotal();
    }
}
function setItemToEdit(e){
    e.preventDefault();
    editItemIndex = e.target.value -1;
    const item = cartItem[editItemIndex].product.toUpperCase();
    if(confirm(`Edit ${item}`)){        
        document.getElementById('availableProCate').selected = cartItem[editItemIndex].category;
        document.getElementById('availableProCate').value = cartItem[editItemIndex].category;
        popProducts(); // populate product
        document.getElementById('productField').selected =cartItem[editItemIndex].product;
        document.getElementById('productField').value = cartItem[editItemIndex].product;
        document.getElementById('price').innerHTML = cartItem[editItemIndex].price;
        document.getElementById('price').value = cartItem[editItemIndex].price;
        document.getElementById('quantity').innerHTML =cartItem[editItemIndex].qty;
        document.getElementById('quantity').value =cartItem[editItemIndex].qty;
        document.getElementById('unitTotal').innerHTML = cartItem[editItemIndex].subtotal; 
        document.getElementById('unitTotal').value = cartItem[editItemIndex].subTotal;
    }  
    edit = true;    
}
function editCartItem(){
    const category = document.getElementById('availableProCate').value.trim();
    const product = document.getElementById('productField').value.trim();
    const price = document.getElementById('price').value.trim();
    const qty = document.getElementById('quantity').value.trim();
    const subTotal = document.getElementById('unitTotal').value.trim();
    
    const data = {category, product, price, qty, subTotal};
    if(category === '' || product == '' || price == '' || qty == '' || subTotal == ''){
        return alert('Please fill all field before adding to cart'); 
    }   
     
    cartItem.splice(editItemIndex, 1, data);
    // displayCartItems();  
    // cartTotal();
    console.log('long awaited cartitem', cartItem);
    return edit = false;
}
function editMain(e){
    setItemToEdit(e);    
}
 
document.addEventListener('click',doAsPlanned);
function doAsPlanned(e){
    if(e.target.id === 'delete'){
        deleteCartItem(e);  
    }
    if(e.target.id === 'edit'){
        editMain(e);  
    }
}

//====================================================================== CHECKOUT TO DATABASE
document.getElementById('checkout').addEventListener('click', checkout);


function checkout(){    
    createSalesFunctionality(); 
}

function createSalesFunctionality(){  // Asign sales to data and pass it down to other function
    cartItem.forEach((item) => {
        const name = item.product;
        const price = item.price;
        const category = item.category;
        const qty = item.qty;
        const type = item.type;
        const id = item.id;
        const total = item.subTotal;
        const data ={name, price, category, qty, type, total, id};
        getAvailableProductQty(id, data); 
    });
    return    printReceipt();
}
function getAvailableProductQty(id, data){  // Get product quantity from database
    const url = `http://localhost:5000/api/v1/product/${id}`;    
    fetch(url, { 
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
                const quantity = result.Product.quantity - data.qty;
                updateAvailableProductQty(id, data, quantity);
                return;
            }            
            alert(result.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}
function updateAvailableProductQty(id, getData, quantity){  // Proceed to update availble product quantity
    const data = Object.assign({quantity}, getData);   
    console.log('Data from updateAvalible Product : ', data); 
    let url =`http://localhost:5000/api/v1/product/${id}`;        
    fetch(url, { // Edit Product quantity
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token,
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => { 
            if(res.Success){
                createSalesRecord(data);                                           
                return;
            }
            alert(res.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}
function createSalesRecord(getData){  // Proceed to create sales record 
    const decoded = jwt_decode(token);
    const attendant = decoded.firstname;
    const data = Object.assign({attendant}, getData, {quantity: getData.qty});  
    console.log('Data  from createSalesRecord : ', data);
    const url = 'http://localhost:5000/api/v1/sales';            
    fetch(url, { 
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
            if(res.Success){ 
                console.log('result from database', res);                           
                return;
            }
            alert(res.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}
function printReceipt(){
    alert('I will print your receipt soon');
    return location.reload();
}