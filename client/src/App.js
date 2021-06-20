
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useState } from "react"
import Login from "./components/Login"
import Meeting from "./components/Meeting"
import Header from "./components/Header"
import { CssBaseline } from "@material-ui/core"


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
          <Route path = '/meeting'>
            {Auth === "Yes" ? <Meeting Auth = {Auth} Authenticate={Authenticate}/>
            : <Login Auth = {Auth} Authenticate={Authenticate} />}
          </Route>
        </Switch>
      </ Router>
    </div>
	)
}

export default App;
