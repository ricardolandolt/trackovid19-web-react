//import decode from "jwt-decode";
import { API_URL } from "./config";
import baseService from "./base.service";
import { putHeader, postHeader } from "./helpers/authHelpers";

export const authService = {
  register,
  login,
  accountExist,
  getToken,
  logout,
  loggedIn,
  postError,
  getProfile,
  forgotPassword,
  changePassword,
  createAccount,
  activateAccount,
};

const baseRoute = "account/";

function postError(obj) {
  return baseService.register(obj, "/errors/");
}

function register(obj) {
  return baseService.register(obj, "/registration/");
}

function accountExist(obj) {
  return baseService.register(obj, `${baseRoute}email/`);
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

function forgotPassword(email) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Origin: API_URL }
  };

  return fetch(`${API_URL + baseRoute}forgotPassword/${email}`, requestOptions).then(
    baseService.handleResponse,
    baseService.handleError
  );
}

function changePassword(oldPassword, newPassword) {
  const requestOptions = {
    ...putHeader(),
    body: JSON.stringify({ oldPassword, newPassword })
  };

  return fetch(`${API_URL}/account/changePassword`, requestOptions).then(
    baseService.handleResponse,
    baseService.handleError
  );
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

function activateAccount(obj) {
  //smarkio automation field ID
  const df_uid = document.querySelector('input[name="lead[df_uid]"]');

  if (df_uid && df_uid.value) {
    obj.automationId = df_uid.value;
  }

  return resetPassword(obj);
}

function resendActivationLink(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  };

  return fetch(`${API_URL}/account/resendActivationLink`, requestOptions).then(
    baseService.handleResponse,
    baseService.handleError
  );
}

function resetPassword(obj) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  };

  return fetch(`${API_URL}account/resetPassword`, requestOptions).then(
    baseService.handleResponse,
    baseService.handleError
  );
}

export default authService;
