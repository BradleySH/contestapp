import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {Link} from "react-router-dom";

import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

const Header = () => {

  const {logout} = useContext(UserContext)
  const [menuToggle, setMenuToggle] = useState(false)

  function toggleMenu(){
    setMenuToggle(prevMenuToggle => !prevMenuToggle)
  }

  function viewedMenu(){
    return(
      <div style={{border: '2px solid black'}}>
        <CancelIcon onClick={() => toggleMenu()} />
        <Link to="/profile">
          Profile
        </Link>
        <p onClick={logout}>Sign Out</p>
      </div>
    )
  }

  return (
    <div className="header-container">
      {!menuToggle ? <MenuIcon onClick={() => toggleMenu()} /> : viewedMenu()}
      <div className="logo">Logo</div>
    </div>
  )
};

export default Header