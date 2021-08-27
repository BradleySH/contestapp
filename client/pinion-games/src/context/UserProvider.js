import React, {useState} from "react";
import axios from "axios";

export const UserContext = React.createContext()

const UserProvider = (props) => {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "",
    errMsg: ''
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
    .catch(err => handleAuthError(err.response.data.errMsg))
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
    .catch(err => handleAuthError(err.response.data.errMsg))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: ""
    })
  }

  const handleAuthError = (errMsg) => {
    setUserState(prevUserState => ({
        ...prevUserState,
        errMsg
    }))
}

  const resetAuthError = () => {
    setUserState(prevUserState => ({
        ...prevUserState,
        errMsg: ''
    }))
  }
  return (
    <UserContext.Provider value={{
      ...userState,
      signup,
      login,
      logout,
      resetAuthError,

    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider