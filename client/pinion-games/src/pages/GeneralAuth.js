import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import GeneralAuthForm from "../components/GeneralAuthForm";
import GeneralAuthLogin from "../components/GeneralAuthLogin";
import AdminAuth from "./AdminAuth"

const initInputs = {firstName: "", lastName: "", email: "", password: "", access: "", client:""}

const Auth = () => {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(true);

  const { signup, login, errMsg, resetAuthError } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  };

  const handleSignup = (e) => {
    e.preventDefault()
    signup(inputs)
  };

  const handleLogin = (e) => {
    e.preventDefault()
    login(inputs)
  };

  const handleToggle = () => {
    setToggle(prevToggle => !prevToggle)
    resetAuthError()
  }

  return (
    <div className="auth-container">
      <h1>PiNiON GAMES</h1>
      { !toggle ?
      <>
      <GeneralAuthForm
        handleChange={handleChange}
        handleSubmit={handleSignup}
        inputs={inputs}
        errMsg={errMsg}
        btnText="Sign Up"
       />
       <p onClick={handleToggle}>Already a Member?</p>
       </>
       :
       <>
       <GeneralAuthLogin 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        errMsg={errMsg}
        inputs={inputs}
        btnText="Login"
       />
       <p onClick={handleToggle}>Not a member?</p>
       </>
      }
      <div className="adminBtn" onClick={handleToggle}>
        <SupervisorAccountIcon className="icon" style={{ color: "#1c3557" }} />
        <Link className="link" to="/admin" render={() => <AdminAuth handleChange={handleChange} handleSubmit={handleLogin} inputs={inputs} />}>Admin?</Link>
      </div>
      
    </div>
  )
};

export default Auth