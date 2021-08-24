import { UserContext } from "../context/UserProvider";
import React, {useState, useContext} from "react";
import AdminForm from "../components/AdminAuthForm";

const initInputs = { email: "", password: ""}

const AdminAuth = () => {
  const [inputs, setInputs] = useState(initInputs);

  const { login } = useContext(UserContext);

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

  return (
    <div className="admin-container">
      <h1>ADMiN LOGiN</h1>
       <AdminForm 
        handleChange={handleChange}
        handleSubmit={handleLogin}
        inputs={inputs}
        btnText="Login"
       />
    </div>
  )
};

export default AdminAuth