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

function AvailableProducts(){
    const url = 'http://localhost:5000/api/v1/products/available';
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
                
            
                createFinishedProductTable();   // CREATE TABLE 
                return  populateFinishedProductTable(result);  //POPULATE TABLE
            
            
            }            
            alert(result.Message);
            return window.location.href = './signin.html';
        })
        .catch(err => console.error('Error :', err));
     
}