import React, {useState} from "react";
import axios from "axios";

export const UserContext = React.createContext()

const UserProvider = (props) => {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || ""
  }
  const [userState, setUserState] = useState(initState);

  const signup = (credentials) => {
    axios.post("/auth/signup", credentials)
    .then(res => {
      const { user, token } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prevUserState => ({
        ...prevUserState,
        user,
        token
      }))
    })
    .catch(err => console.log(err.response.data.errMsg))
  }
  
  const login = (credentials) => {
    axios.post("/auth/login", credentials)
    .then(res => {
      const { user, token } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prevUserState => ({
        ...prevUserState,
        user,
        token
    }))
  })
    .catch(err => console.log(err.response.data.errMsge))
  }

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setUserState({
    user: {},
    token: ""
  })
}
  return (
    <UserContext.Provider value={{
      ...userState,
      signup,
      login,
      logout
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider