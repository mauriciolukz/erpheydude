import { apiUrl,handleResponse,showRequest } from '../helpers/config';

export const userService = {
    login,
    logout
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