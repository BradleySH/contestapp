import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {UserContext} from "./context/UserProvider"
import "./App.scss";

import Auth from "./components/Auth"
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin"
import EmployeeProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";

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
              return <Redirect to='/home' />
            }
            else {
              return <Auth />
            }
          }}
        />
        <Route 
          path="/admin"
          render={() => {if(token && role === 'admin'){
            console.log(role)
            return <Redirect to='/home' />
          }
          else {
            console.log(role)
            return <Admin />
          }
  }}
        />
        <ProtectedRoute
          path='/home'
          component={role === 'general' ? EmployeeProfile : AdminProfile}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  );
}

export default App;
