import constants from "./auth.constants";

const initialState = {
  loadingLogin: false,
  loadingCreateAccount: false
};

const clearErrors = { message: undefined, error: undefined };

export function auth(state = initialState, action) {
  switch (action.type) {
    //login
    case constants.LOGIN_REQUEST:
      return Object.assign({}, state, { loggedIn: false, loadingLogin: true, user: action.user }, clearErrors);

    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loadingLogin: false,
        user: action.user,
        loggedIn: true
      });

    case constants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loadingLogin: false,
        error: action.error
      });

    //logout
    case constants.LOGOUT:
      return {};

    //create account
    case constants.REGISTER_REQUEST:
      return Object.assign({}, state, { loadingCreateAccount: true, user: action.user }, clearErrors);

    case constants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        loadingCreateAccount: false,
        user: { id: action.user ? action.user.data : "" }
      });

    case constants.REGISTER_FAILURE:
      return Object.assign({}, state, {
        loadingCreateAccount: false,
        error: action.error
      });

    //clear errors
    case constants.CLEAR_ERRORS:
      return Object.assign({}, state, clearErrors);

    default:
      return state;
  }
}

export default auth;
