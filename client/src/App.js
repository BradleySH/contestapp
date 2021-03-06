import React, {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {UserContext} from "./context/UserProvider"
import "./App.scss"

import GeneralAuth from "./pages/GeneralAuth"
import AdminAuth from "./pages/AdminAuth"
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from "./pages/Profile"
import AdminClient from "./pages/AdminClient"
import Client from "./pages/Client"
import CreateClient from "./pages/CreateClient"
import Team from "./pages/Team"
import CreateTeam from "./pages/CreateTeam"
import AddTeamMember from "./pages/AddTeamMember"
import Header from "./components/Header"
import FooterNavbar from "./components/FooterNavbar"
import Events from "./pages/Events"
import Contests from "./pages/Contests"
import CreateEvent from "./pages/CreateEvent"
import Event from "./pages/Event"

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
            if(token){
              if(role === 'general' || 'commissioner'){
                return <Redirect to='/profile' />
              }
            }
            else {
              return <GeneralAuth />
            }
          }}
        />
        <Route 
          path="/admin"
          render={() => {if(token && role === 'admin'){
            return <Redirect to='/profile' />
          }
          else {
            return <AdminAuth />
          }
          }}
        />
      </Switch>

      {token ? <Header /> : null}
        <main style={{height: token ? '100vh' : 0, width: '100vw', overflow: 'auto', scrollBehavior: 'smooth'}}>
        <Switch>
          <ProtectedRoute
            path='/profile'
            component={Profile}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/adminclient'
            component={AdminClient}
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
            path='/createclient'
            component={CreateClient}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/team'
            component={Team}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/createteam'
            component={CreateTeam}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/addteammember'
            component={AddTeamMember}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/events'
            component={Events}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/contests'
            component={Contests}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/createevent'
            component={CreateEvent}
            redirectTo='/'
            token={token}
          />
          <ProtectedRoute
            path='/event'
            component={Event}
            redirectTo='/'
            token={token}
          />
        </Switch>
      </main>
      {token ? <FooterNavbar style={{position: "-webit-sticky", position: "sticky"}} /> : null}
    </div>
  )
}

export default App
