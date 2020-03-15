import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./helpers/PrivateRoute";
import DashPage from "./components/DashPage";
import AboutPage from "./components/AboutPage";
import TermsPage from "./components/TermsPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
