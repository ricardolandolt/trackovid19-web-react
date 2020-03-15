import decode from "jwt-decode";
import { API_URL } from "./config";
import baseService from "./base.service";
import { postHeader } from "./helpers/authHelpers";

export const authService = {
  login,
  getToken,
  logout,
  loggedIn,
  postError,
  getProfile,
  createAccount
};

function postError(obj) {
  return baseService.register(obj, "/errors/");
}

function login(email, password) {
  var details = {
    password: password,
    email: email
  };

  //smarkio automation field ID
  const df_uid = document.querySelector('input[name="lead[df_uid]"]');

  if (df_uid && df_uid.value) {
    details.automationId = df_uid.value;
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json-patch+json" },
    body: JSON.stringify(details)
  };

  return fetch(`${API_URL}account/login/`, requestOptions)
    .then(baseService.handleResponse, baseService.handleError)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        setToken(user.token);
        //localStorage.setItem('user', JSON.stringify(user));
      }
      return { profile: getProfile() };
    });
}

function getProfile() {
  const token = getToken();

  if (!token) return {};

  try {
    //const tokenDecoded = decode(token);
    const tokenDecoded = undefined;
    return {
      userId: tokenDecoded.userId,
      email: tokenDecoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
      name: tokenDecoded.fullName || "",
      createdDate: tokenDecoded.createdDate || ""
    };
  } catch (error) {
    return {};
  }
}

function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = getToken(); // GEtting token from localstorage
  return !!token && !isTokenExpired(token); // handwaiving here
}

function isTokenExpired(token) {
  try {
    const decoded = undefined; // decode(token);

    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired. N
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function setToken(idToken) {
  // Saves user token to localStorage
  localStorage.setItem("id_token", idToken);
}

function getToken() {
  // Retrieves the user token from localStorage
  if (typeof localStorage !== `undefined`) return localStorage.getItem("id_token");

  return "";
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("id_token");
  //navigate("/");
}

function createAccount(obj) {
  //smarkio automation field ID
  const df_uid = document.querySelector('input[name="lead[df_uid]"]');

  if (df_uid && df_uid.value) {
    obj.automationId = df_uid.value;
  }

  const requestOptions = {
    ...postHeader(),
    body: JSON.stringify(obj)
  };

  return fetch(`${API_URL}customer`, requestOptions).then(baseService.handleResponse, baseService.handleError);
}

export default authService;
