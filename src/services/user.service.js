import { apiUrl } from '../helpers/config';

export const userService = {
    login,
    logout,
    register
}; 

function login(email, password) { 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${apiUrl()}/SY01400/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }); 
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if (response.status === 401) {
                logout();
                //location.reload(true);authHeader
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}