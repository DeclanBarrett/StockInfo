import React from "react";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Pages
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import Symbols from "./pages/Symbols";
import PriceHistory from "./pages/PriceHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {CheckAuth} from './components/Auth.js'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./css/App.css";
import "./css/ReactGrid.css";

// Route url paths to appropriate pages
export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/symbols">
            <Symbols />
          </Route>
          <Route exact path="/quote">
            <Quote />
          </Route>
          {/* Private Route hiding pricehistory*/}
          <PrivateRoute path="/pricehistory" component={PriceHistory} />
          {/* Handles standard login*/}
          <Route exact path="/login" component={Login} />
          {/* Handles redirects with paramters */}
          <Route path="/login/:status" component={Login} />
          <Route exact path="/register">
            <Register />
          </Route>
          {/* All other routes to the host will hit the home page */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

// Redirects to login from price history if unauthorised 
// - based on: https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        (CheckAuth()) ? 
        <Component {...props} /> : 
        <Redirect to="/login/denied" />
      }
    />
  );
}
