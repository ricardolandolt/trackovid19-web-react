import authActions from "../authentication/auth.actions";

function initializeApp() {
  return dispatch => {

    if (authActions.isLoggedIn()) {
      //console.log('logged');
    }
  };
}

export default { initializeApp };
