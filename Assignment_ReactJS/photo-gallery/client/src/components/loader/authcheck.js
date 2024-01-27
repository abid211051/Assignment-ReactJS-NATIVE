export const authcheck = () => {
    const islogin = JSON.parse(localStorage.getItem('islogin'));
    if(islogin){
        return true;
    }
    else{
        return false;
    }
}