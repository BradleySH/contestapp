
import {useState} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "../styles/header.scss"
import Logo from "./Logo"
import Menu from "./Menu"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="header">
      <nav className="navbar-top">
      <MenuIcon className="menu-icon" onClick={() => setShowMenu(true)}/>
      { showMenu && <Menu  close={setShowMenu}/>}
      </nav>
      <Logo />
    </header>
  )
};

export default Header