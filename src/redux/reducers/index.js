import { combineReducers } from "redux";
//import { reducer as form } from "redux-form";
//import { default as account } from "./account/account.reducer";
import { default as auth } from "./authentication/auth.reducer";

const appReducer = combineReducers({
  //form,
  //account,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT") {
    //console.log('CLEAR STATE!');
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
