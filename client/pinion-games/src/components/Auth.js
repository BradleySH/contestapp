import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import AuthForm from "./AuthForm";
import {UserContext} from "../context/UserProvider";
import AuthLogin from "./AuthLogin";
import Admin from "./Admin"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const initInputs = {firstName: "", lastName: "", email: "", password: ""}

const Auth = () => {
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  const { signup, login } = useContext(UserContext);

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

  return (
    <div className="auth-container">
      <h1>PiNiON GAMES</h1>
      { !toggle ?
      <>
      <AuthForm
        handleChange={handleChange}
        handleSubmit={handleSignup}
        inputs={inputs}
        btnText="Sign Up"
       />
       <p onClick={() => setToggle(prev => !prev)}>Already a Member?</p>
       </>
       :
       <>
       <AuthLogin 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        btnText="Login"
       />
       <p onClick={() => setToggle(prev => !prev)}>Not a member?</p>
       </>
      }
      <div className="adminBtn">
        <SupervisorAccountIcon className="icon" style={{ color: "#1c3557" }} />
        <Link className="link" to="/admin" render={() => <Admin handleChange={handleChange} handleSubmit={handleLogin} inputs={inputs} />}>Admin?</Link>
      </div>
      
    </div>
  )
};

export default Auth