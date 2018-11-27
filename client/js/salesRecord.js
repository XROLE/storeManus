// SET TOKEN IF PRESENT
let token='';
if(localStorage.getItem('accessToken') !== null){
    token = `Bearer ${localStorage.getItem('accessToken')}`;
}
window.onload = () => {
    
    getOneAttendantSales();
    
    
};
function getOneAttendantSales(){ // GET AN ATTENDANT SALES RECORD
    const decoded = jwt_decode(token);
    const attendant = decoded.firstname;
    const url =`http://localhost:5000/api/v1/sales/${attendant}`;        
    fetch(url, { 
        method: 'GET',        
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'x-access-token': token,
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => { 
            if(res.Success){
                return popSalesTable(res);
            }
            alert(res.Message);
            return;
        })
        .catch(err => console.error('Error :', err));
}

function popSalesTable(res){ 
    addTotal(res);
    for(let i=0; i<res.sale.length; i++){
        const salesValue = `<tr>
    <td>${res.sale[i].name}</td>
    <td>${res.sale[i].price}</td>
    <td>${res.sale[i].quantity}</td>
    <td>${res.sale[i].type}</td>
    <td>${res.sale[i].category}</td>
    <td>${res.sale[i].total}</td>
    </tr>`;
        document.getElementById('attSalesTable').innerHTML += salesValue; 
    }
}

function addTotal(sales){    
    if(sales.sale.length > 0){
        const subTotalArr = sales.sale.map(item => parseInt(item.total));
        const Total = subTotalArr.reduce((total, subtotal) => total + subtotal);
        console.log('Grand total:  ', Total);
        const totalTable = `
        <th>TOTAL</th>
           <th></th>
           <th></th>
           <th></th>
           <th></th>
           <th># ${Total}</th>`;
        document.getElementById('total').innerHTML=totalTable; 
    }   
}
