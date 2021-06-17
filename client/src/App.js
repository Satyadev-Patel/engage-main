
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./components/Home"
import Meeting from "./components/Meeting"
import Header from "./components/Header"
import { makeStyles } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"

function App() {
  return (
      <div>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path = '/'>
              <Header />
            </Route>
            <Route exact path = '/meeting'>
              <Meeting />
            </Route>
          </Switch>
        </ Router>
      </div>
	)
}

export default App;
