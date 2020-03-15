import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import appMiddleware from "./middlewares/app.middleware";
import AppActions from "./reducers/app/app.actions";

const { NODE_ENV } = process.env;

const initialState = {};
const middlewares = [thunk, appMiddleware];
const windowGlobal = typeof window !== "undefined" && window;
const theWindow = (typeof window !== "undefined" && window) || {};

const isDev =
  NODE_ENV === "development" &&
  (windowGlobal.devToolsExtension && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = isDev
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middlewares),
        theWindow.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
  : createStore(rootReducer, compose(applyMiddleware(...middlewares)));

if (typeof window !== "undefined") {
  store.dispatch(AppActions.initializeApp());
}

export { store };
