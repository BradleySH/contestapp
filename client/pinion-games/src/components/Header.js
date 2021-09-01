
import {useState} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "../styles/header.scss"
import Logo from "./Logo"
import Menu from "./Menu"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="navbar-top">
      <MenuIcon onClick={() => setShowMenu(!showMenu)} />
      { showMenu && <Menu  />}
      <Logo />
      
    </nav>
  )
};

export default Header