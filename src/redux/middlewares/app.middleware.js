import authActions from "../reducers/authentication/auth.actions";

function appMiddleware(store) {
  return next => action => {
    //control error status 401 forbidden & force logout
    if (action.error && action.error == "Your session has expired or you don't have permissions to this actions, please login again.") {
      store.dispatch(authActions.logout());
    }

    return next(action);
  };
}

export default appMiddleware;
