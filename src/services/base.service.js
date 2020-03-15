import { API_URL } from '../config';

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    const contentType = response.headers.get('content-type');

    if (response.ok) {
      // return json if it was returned in the response
      if (contentType && contentType.includes('application/json')) {
        try {
          response.json().then((json) => { resolve && resolve(json); });
        } catch (e) {
          // console.log(e);
        }
      } else {
        // console.log('not json');
      }
    }
    else if (response.status === 503) {
      reject(["The server is unavailable. Please try later."]);
    }
    else if (response.status === 401) {
      reject(["Your session has expired or you don't have permissions to this actions, please login again."]);
    }
    else if (response.status === 403) {
      reject(["You don't have permissions to this actions."]);
    }
    else if (contentType && contentType.includes('application/json')) {
      response.json().then(json => reject(json.errors || (json.message || ["An error has occurred, please try again."])));
    }
    else {
      response.text().then(text => reject(text || ["An error has occurred, please try again."]));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}

function getAll(route, ...params) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  let query = '';

  if (params && params.length > 0) {
    query += '?';
    for (var param of params) {
      Object.keys(param).map((key) => {
        if (param[key]) query += `${key}=${param[key]}&`;
      });
    }
  }

  return fetch(API_URL + route + query, requestOptions).then(handleResponse, handleError);
}

function getById(id, route) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(API_URL + route + id, requestOptions).then(handleResponse, handleError);
}

function register(obj, route) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  };

  return fetch(API_URL + route, requestOptions).then(handleResponse, handleError);
}

function update(obj, route) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  };

  return fetch(API_URL + route, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, route) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(API_URL + route + id, requestOptions).then(handleResponse, handleError);
}

export function authHeader() {
  // return authorization header with jwt token
  let id_token = localStorage.getItem('token');

  if (id_token) {
    return { 'x-access-token': id_token };
  } else {
    return {};
  }
}

export function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem('token');
}

export const baseService = {
  getAll,
  getById,
  register,
  update,
  delete: _delete,
  handleResponse,
  handleError,
  _delete,
  authHeader
};

export default baseService;
