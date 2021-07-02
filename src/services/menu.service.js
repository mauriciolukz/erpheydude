import { apiUrl,authHeader,showRequest } from '../helpers/config';
import axios from 'axios';

export const menuService = {
    menu,
    cards
}; 

async function menu(){ 
     
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${JSON.parse(localStorage.user).token}`  },
    };
    showRequest(`${apiUrl()}/SY01400/menu`,requestOptions,JSON.parse(localStorage.user).token)
    let res = await fetch(`${apiUrl()}/SY01400/menu`, requestOptions)
    return res.json();
}

async function cards(id_card){
    return await axios.post(`${apiUrl()}/SY01400/menu/cards`, {
        id_card: id_card
      },authHeader())
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      }); 
}

