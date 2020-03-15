import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { store } from "./redux/configStore";
import { PrivateRoute } from "./helpers/PrivateRoute";
import DashPage from "./components/DashPage";
import AboutPage from "./components/AboutPage";
import TermsPage from "./components/TermsPage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import "./stylesheets/main.css";
import OnboardingPage from "./components/OnboardingPage";
import Menu from "./components/Menu/Menu";
import logo from "./logo.svg";

function App() {
  const MenuComponent = withRouter(props => <Menu {...props} />);

  return (
    <Provider store={store}>
      <Router>
        <div className="header-row">
        <div className="container-fluid">
          <div className="header">
              <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" style={{ width: "50px" }} />
              <span>TrackCovid</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-row">
          <div className="main">
            <div className="container-fluid">
              <Switch>
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/terms" component={TermsPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/onboarding" component={OnboardingPage} />
                <PrivateRoute exact path="/" component={DashPage} />
              </Switch>
            </div>
            </div>
        </div>
        <div className="site-footer">
          <MenuComponent />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
