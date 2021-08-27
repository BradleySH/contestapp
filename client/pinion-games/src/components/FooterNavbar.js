import { Link } from "react-router-dom"
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HomeIcon from '@material-ui/icons/Home';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';


const FooterNavbar = () => {
  
  return (
    <div className="navbar">
      <Link to="/events">
        <div className="events">
          <p>Events</p>
          <EventAvailableIcon />
        </div>
      </Link>
      <Link to="/client">
        <div className="clients">
          <p>Home</p>
          <HomeIcon />
        </div>
      </Link>
      <Link to="/contests">
        <div className="contests">
          <p>Contests</p>
          <InsertInvitationIcon />
        </div>
      </Link>
    </div>
  )
}

export default FooterNavbar