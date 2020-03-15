import { request } from "https";

export function authHeader() {
    // return authorization header with jwt token
    let id_token = getToken();
    
    if (id_token) {
        return { 'Authorization': 'Bearer ' + id_token };
    } else {
        return {};
    }
}

export function getToken() {
    // Retrieves the user token from localStorage
    if (typeof localStorage !== `undefined`)
        return localStorage.getItem('id_token');
    return '';
  }

const defaultHeaders = () => {return {...authHeader(), 'Content-Type': 'application/json'} }

export const putHeader = () =>  ({    
        method: 'PUT',
        headers: defaultHeaders() ,
})

export const postHeader = () =>({    
    method: 'POST',
    headers: defaultHeaders() ,
})

export const getHeader = () => ({    
    method: 'GET',
    headers: defaultHeaders() ,
})

export function getHeaderForUploads(obj) 
{
    const formData = new FormData();

    for (const name in obj) {
      formData.append(name, obj[name]);
    }
    
    const requestOptions = {
      ...postHeader,
      body: formData,
    };
    
    return requestOptions;
}

export const Headers = {
    putHeader, postHeader, getHeader,
    getHeaderForUploads

}