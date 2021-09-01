import React, {useContext} from "react"
import "../styles/header.scss"
import {UserContext} from "../context/UserProvider"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Menu = (props) => {
  const {logout} = useContext(UserContext)
  const {close} = props
  return (
    <div className="sidebar active">
      <CancelIcon style={{color: "#A9DADC"}} onClick={() => close(false)}/>
      <div style={{display: 'grid', justifyContent: 'center'}}>
        <img src="/images/lightbulb.svg" alt="lightbulb" />
        <h2>Menu</h2>
      </div>
        <ul>
          <li>
            <a href="/profile"><AccountCircleIcon /> Profile</a>
          </li>
          <li>
            <a href="/events"><EventAvailableIcon /> Events Schedule</a>
          </li>
          <li>
            <a href="/contests"><InsertInvitationIcon /> Gaming Contests</a>
          </li>
          <li>
            <a onClick={logout}><ExitToAppIcon /> Logout</a>
          </li>
        </ul>
      </div>
  )
}

export default Menu