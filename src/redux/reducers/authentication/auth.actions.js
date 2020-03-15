import constants from "./auth.constants";
import theService from "../../../services/auth.service";

function login(username, password) {
  function request(user) {
    return { type: constants.LOGIN_REQUEST, user };
  }

  function success(user, roles) {
    return { type: constants.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.LOGIN_FAILURE, error };
  }

  return dispatch => {
    dispatch(request({ username }));
    theService.login(username, password).then(
      resp => {
        dispatch(success(resp.profile));
      },
      error => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function logout() {
  theService.logout();
  return { type: constants.LOGOUT };
}

function createAccount(
  email,
  firstName,
  lastName,
  phoneNumber,
  consentPrivacyPolicy,
  consentUseDataPolicy,
  consentMarketingPolicy
) {
  function request(payload) {
    return { type: constants.CREATE_CLIENT_REQUEST, payload };
  }

  function success(user) {
    return { type: constants.CREATE_CLIENT_SUCCESS, user };
  }

  function failure(error) {
    return { type: constants.CREATE_CLIENT_FAILURE, error };
  }

  const obj = {
    email,
    firstName,
    lastName,
    phoneNumber,
    consentPrivacyPolicy,
    consentUseDataPolicy,
    consentMarketingPolicy
  };

  return dispatch => {
    dispatch(request(obj));
    theService.createAccount(obj).then(
      resp => {
        dispatch(success(resp));
      },
      error => {
        if (error.status) {
          dispatch(failure(error.message, error.status));
        } else {
          dispatch(failure(error));
        }
      }
    );
  };
}

function isLoggedIn() {
  const prof = theService.getProfile();
  return !!(prof && prof.email);
}

function clearErrors() {
  function request() {
    return { type: constants.CLEAR_ERRORS };
  }

  return dispatch => {
    dispatch(request());
  };
}

const authActions = {
  login,
  logout,
  isLoggedIn,
  createAccount,
  clearErrors
};

export default authActions;
