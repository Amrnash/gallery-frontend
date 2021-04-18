import React from "react";
import GalleryNavbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <GalleryNavbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
