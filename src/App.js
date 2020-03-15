import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from './redux/configStore';
import { PrivateRoute } from "./helpers/PrivateRoute";
import DashPage from "./components/DashPage";
import AboutPage from "./components/AboutPage";
import TermsPage from "./components/TermsPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/terms" component={TermsPage} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={DashPage} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
