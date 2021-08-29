import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {Link} from "react-router-dom";
import "../styles/header.scss"
import Logo from "./Logo"


const Header = () => {
  const { user: {role} } = useContext(UserContext)

  return (
    <nav className="navbar-top">
      <Logo />
    </nav>
  )
};

export default Header