import { UserContext} from "../context/UserProvider";
import React, {useState, useContext} from "react";
import { Redirect } from "react-router";
import AdminForm from "../components/AdminAuthForm";

const initInputs = { email: "", password: ""}

const AdminAuth = () => {
  const [inputs, setInputs] = useState(initInputs);
  const [isAdmin, setIsAdmin] = useState(true)

  const { login, errMsg, resetAuthError } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  };

  const handleLogin = (e) => {
    e.preventDefault()
    login(inputs)
  };

  function toggleForm(){
    resetAuthError()
    setIsAdmin(prevIsAdmin => !prevIsAdmin)
  }

  return (
    <div className="admin-container">
      <h1>ADMiN LOGiN</h1>
       <AdminForm 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        errMsg={errMsg}
        btnText="Login"
       />
       {isAdmin ? <p onClick={toggleForm}>Not an Admin?</p> : <Redirect to='/' />}
    </div>
  )
};

export default AdminAuth