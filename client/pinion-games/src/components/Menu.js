import React, {useContext} from "react"
import "../styles/header.scss"
import {UserContext} from "../context/UserProvider"

const Menu = () => {
  const {logout} = useContext(UserContext)
  return (
    <div className="sidebar active">
        <ul>
          <li>
            <a href="/profile">Home</a>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
  )
}

export default Menu