import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login/Login";
import Meeting from "./components/Meeting/Meeting";
import Header from "./components/Header/Header";
import { CssBaseline } from "@material-ui/core";
import SignUp from "./components/Register/Register";
import Calendar from "./components/Calendar/Calendar";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import YourMeet from "./components/YourMeet/YourMeet";

const App = () => {
  // User authentication parameters.
  const [Auth, setAuth] = useState(
    window.sessionStorage.getItem("isAuthenticate")
  );
  const Authenticate = () => {
    setAuth(window.sessionStorage.getItem("isAuthenticate"));
  };

  // Routing using react-router-dom

  return (
    <div>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/"
                Auth={Auth}
                Authenticate={Authenticate}
                component={Header}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            {Auth === "Yes" ? (
              <Redirect to="/" />
            ) : (
              <Login Auth={Auth} Authenticate={Authenticate} />
            )}
          </Route>
          <Route exact path="/calendar">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/calendar"
                Auth={Auth}
                Authenticate={Authenticate}
                component={Calendar}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/meeting/:roomID/:roomName">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/meeting/:roomID/:roomName"
                Auth={Auth}
                Authenticate={Authenticate}
                component={Meeting}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/register">
            {Auth === "Yes" ? (
              <Redirect to="/" />
            ) : (
              <SignUp Auth={Auth} Authenticate={Authenticate} />
            )}
          </Route>
          <Route exact path="/home">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/home"
                Auth={Auth}
                Authenticate={Authenticate}
                component={Home}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/yourmeet">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/yourmeet"
                Auth={Auth}
                Authenticate={Authenticate}
                component={YourMeet}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/chat">
            {Auth === "Yes" ? (
              <Route
                exact
                path="/chat"
                Auth={Auth}
                Authenticate={Authenticate}
                component={Chat}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
