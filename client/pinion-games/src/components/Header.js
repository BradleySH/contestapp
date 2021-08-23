//import {Link} from "react-router-dom";
import { useContext } from "react"
import { UserContext } from "../context/UserProvider"

const Header = () => {

  const {logout} = useContext(UserContext)

  return (
    <div className="header-container">
      <div className="logo">Logo</div>
      <p onClick={logout}>Logout</p>
    </div>
  )
};

export default Header