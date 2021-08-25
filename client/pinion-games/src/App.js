import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {UserContext} from "./context/UserProvider"
import "./App.scss";

import GeneralAuth from "./pages/GeneralAuth"
import AdminAuth from "./pages/AdminAuth"
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile"
import Client from "./pages/Client"
import Team from "./pages/Team"

function App() {
  const { 
    token,
    user: {
      role
    }
  } = useContext(UserContext)
  return (
    <div className="App">
      <Switch>
        <Route
          exact path='/'
          render={() => {
            if(token && role === 'general'){
              return <Redirect to='/profile' />
            }
            else {
              return <GeneralAuth />
            }
          }}
        />
        <Route 
          path="/admin"
          render={() => {if(token && role === 'admin'){
            console.log(role)
            return <Redirect to='/profile' />
          }
          else {
            console.log(role)
            return <AdminAuth />
          }
  }}
        />
        <ProtectedRoute
          path='/profile'
          component={Profile}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute
          path='/client'
          component={Client}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute
          path='/team'
          component={Team}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  );
}

export default App;
