function checktoken(){
    if(!localStorage.getItem('accessToken')){
        alert('unauthorized access. Please sign in to obtain access right');
        window.location.href = '../views/signin.html';
        return;
    }
}
checktoken();