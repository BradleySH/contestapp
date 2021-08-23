
import { Link } from "react-router-dom"
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HomeIcon from '@material-ui/icons/Home';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';


const Footer = () => {
  
  return (
    <div className="navbar">
      <Link to="/events"><EventAvailableIcon /></Link>
      <Link to="/employee"><HomeIcon /></Link>
      <Link to="/contests"><InsertInvitationIcon /></Link>
    </div>
  )
}

export default Footer