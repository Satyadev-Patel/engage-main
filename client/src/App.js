
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useState } from "react"
import Login from "./components/Login"
import Home from "./components/Home"
import Meeting from "./components/Meeting"
import Header from "./components/Header"
import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"
import io from "socket.io-client";
import Googlelogin from "./components/GoogleLogin"

const socket = io.connect("http://localhost:5000");

function App() {
  const [Auth, setAuth] = useState(
    window.sessionStorage.getItem("isAuthenticate")
  );
  const Authenticate = () => {
    setAuth(window.sessionStorage.getItem("isAuthenticate"));
    //  window.alert(Auth + "..Hook from App");
  };
  return (
    <div>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path = '/'>
            {Auth === "Yes" ? <Header Auth = {Auth} Authenticate={Authenticate}/> 
            : <Login Auth = {Auth} Authenticate={Authenticate} />}
          </Route>
          <Route exact path = '/meeting'>
            {Auth === "Yes" ? <Meeting Auth = {Auth} Authenticate={Authenticate}/>
            : <Login Auth = {Auth} Authenticate={Authenticate} />}
          </Route>
        </Switch>
      </ Router>
    </div>
	)
}

export default App;
