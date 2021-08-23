import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Auth from "./components/Auth"
import "./App.scss";
import Admin from "./components/Admin"
import EmployeeProfile from "./components/EmployeeProfile";
import {UserContext} from "./context/UserProvider"

function App() {
  const { token } = useContext(UserContext)
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"
        render={() => <Auth />}
        />
        <Route path="/admin"
        render={() => <Admin />}
        />
        <Route path="/employee"
        render={() => <EmployeeProfile />}
        />
      </Switch>
    </div>
  );
}

export default App;
