import React, {useContext} from "react"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarsIcon from '@material-ui/icons/Stars';
import Header from './Header';
import {UserContext} from "../context/UserProvider";
import Footer from "./Navbar";


const EmployeeProfile = () => {
  const { user: { firstName }, logout} = useContext(UserContext)
  return (
    <>
    <Header />
    <div className="team-name">
      <div className="circle"></div>
      <p><span>Team</span> Name</p>
    </div>
    <div className="employee">
      <div className="stats">
        <div className="user-stats">
        <div className="user">
        <img src="<AccountCircleIcon />" default={<AccountCircleIcon />}/>
        <p>Welcome, @{firstName}!</p>
      </div>
        <div className="cash">
            <AttachMoneyIcon />
            <p>$1500.00</p>
        </div>
        <div className="points">
            <p>Total Points: 100</p>
        </div>
        <div className="standing">
            <p>1st</p>
        </div>
        </div>
        
        <p className="team-title">Team Members</p>
        <div className="team-members">
          <div className="coach">
            <StarsIcon style={{ color: "gray"}} />
            <p>Coach</p>
          </div>
          <div className="member1">
            <AccountCircleIcon style={{ color: "gray"}} />
            <p>Name</p>
          </div>
          <div className="member2">
            <AccountCircleIcon style={{ color: "gray"}} />
            <p>Name</p>
          </div>
          <div className="member2">
            <AccountCircleIcon style={{ color: "gray"}} />
            <p>Name</p>
          </div>
          <div className="member3">
            <AccountCircleIcon style={{ color: "gray"}} />
            <p>Name</p>
          </div>
          <div className="member4">
            <AccountCircleIcon style={{ color: "gray"}} />
            <p>Name</p>
          </div>
          <div className="member5">
          < AccountCircleIcon style={{ color: "gray"}} />
          <p>Name</p>
          </div>
        </div>

      </div>
      
    </div>
    <div className="team-info">
      <div className="graph">
        <h1>Graph Here</h1>
      </div>
      <div className="team-ranking">
        <div className="team1"></div>
        <div className="team2"></div>
        <div className="team3"></div>
        <div className="team4"></div>
      </div>
    </div>
    <button onClick={logout}>Logout</button>
    <Footer />
    </>
  )
}

export default EmployeeProfile