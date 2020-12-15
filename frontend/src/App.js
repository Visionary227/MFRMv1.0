import React from "react";
import "./App.css";
import Home from "./containers/home";
import Stake from "./containers/stake";
import About from "./containers/about";
import TermsOfUse from "./containers/termsOfUse";
import PrivacyPolicy from "./containers/privacyPolicy";
import ContactUs from "./containers/contactUs";
import Harvest from "./containers/harvest";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/stake" component={Stake} />
        <Route exact path="/about" component={About} />
        <Route exact path="/termsOfUse" component={TermsOfUse} />
        <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
        <Route exact path="/contactUs" component={ContactUs} />
        <Route exact path="/harvest" component={Harvest} />
      </Switch>
    </Router>
  );
}

export default App;
