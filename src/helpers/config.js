
export function apiUrl() {
    // https://rocky-gorge-03730.herokuapp.com/api/documentation swagger
    return 'https://rocky-gorge-03730.herokuapp.com/api';
    //return 'http://127.0.0.1:8000/api';
}


export function authHeader(){
    let token = JSON.parse(localStorage.user).token;
    return  {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json','Authorization': `Bearer ${token}` }}
}

export function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 401) {
                //logout();
                //location.reload(true);authHeader
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function showRequest(url,url2,url3){
    console.log(url);
    //console.log(`${url} ${JSON.parse(localStorage.user).token}`)
}