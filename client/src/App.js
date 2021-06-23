
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import { useState } from "react"
import Login from "./components/Login"
import Meeting from "./components/Meeting/Meeting"
import Header from "./components/Header"
import { CssBaseline } from "@material-ui/core"
import SignUp from "./components/Register"
import Calendar from "./components/Calendar/Calendar"

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
            : <Redirect to = "/login"/>}
          </Route>
          <Route exact path = '/login'>
            {Auth === "Yes" ? <Redirect to = "/"/> 
            : <Login Auth = {Auth} Authenticate={Authenticate} />}
          </Route>
          <Route exact path = '/calendar'>
            {Auth === "Yes" ? <Calendar Auth = {Auth} Authenticate={Authenticate}/>
            : <Redirect to = "/login"/>}
          </Route>
          <Route exact path = '/meeting'>
            {Auth === "Yes" ? <Meeting Auth = {Auth} Authenticate={Authenticate}/>
            : <Redirect to = "/login"/>}
          </Route>
          <Route exact path = "/register">
            {Auth === "Yes" ? <Redirect to = "/"/> 
            : <SignUp Auth = {Auth} Authenticate={Authenticate} />}
          </Route>
        </Switch>
      </ Router>
    </div>
	)
}

export default App;
