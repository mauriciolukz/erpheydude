
export function apiUrl() {
    return 'https://rocky-gorge-03730.herokuapp.com/api';
    //return 'http://127.0.0.1:8000/api';
}


export function authHeader(){
    let token = JSON.parse(localStorage.user).token;
    return  {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json','Authorization': `Bearer ${token}` }}
}