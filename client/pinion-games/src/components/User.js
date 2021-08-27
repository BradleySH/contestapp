import React, {useContext} from "react"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarsIcon from '@material-ui/icons/Stars';
import Header from './Header';
import {UserContext} from "../context/UserProvider";
import FooterNavbar from "./FooterNavbar";


const UserProfile = () => {
  const { user: { firstName, avatar }, logout} = useContext(UserContext)
  return (
    <>
    <Header />
    <div className="team-name">
      <p><span>Team</span> Name</p>
      <div className="circle"></div>
    </div>
    <div className="user">
      <div className="stats">
        <div className="user-stats">
        <div className="user">
        <img src={avatar} />
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
            <StarsIcon style={{ color: "gray", height: "40px", width: "40px"}} />
            <p>Coach</p>
          </div>
          <div className="member1">
            <AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
            <p>Name</p>
          </div>
          <div className="member2">
            <AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
            <p>Name</p>
          </div>
          <div className="member2">
            <AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
            <p>Name</p>
          </div>
          <div className="member3">
            <AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
            <p>Name</p>
          </div>
          <div className="member4">
            <AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
            <p>Name</p>
          </div>
          <div className="member5">
          < AccountCircleIcon style={{ color: "gray",height: "40px", width: "40px"}} />
          <p>Name</p>
          </div>
        </div>
      </div>
    </div>
    <p className="team-standing">Current Standings</p>
    <div className="team-info">
      <div className="graph">
        <div className="second">
          <div className="two">
          <p>Team Name</p>
            <p># Points</p>
            <p>2nd</p>
          </div>
        </div>
        <div className="first">
          <div className="one">
            <p>Team Name</p>
            <p># Points</p>
            <p>1st</p>
          </div> 
        </div>
        <div className="third">
          <div className="three">
            <p>Team Name</p>
            <p># Points</p>
            <p>3rd</p>
          </div>
        </div>
      </div>
      <div className="team-ranking">
        <div className="team1">
          <p>TeamName</p>
          <div className="avatar"></div>
          <label>rank</label>
          <p># Points</p>
        </div>
        <div className="team2">
          <p>TeamName</p>
          <div className="avatar"></div>
          <label>rank</label>
          <p># Points</p>
        </div>
        <div className="team3">
          <p>TeamName</p>
          <div className="avatar"></div>
          <label>rank</label>
          <p># Points</p>
        </div>
        <div className="team4">
          <p>TeamName</p>
          <div className="avatar"></div>
          <label>rank</label>
          <p># Points</p>
        </div>
      </div>
    </div>
    <div className="btn-logout">
      <button className="logout" onClick={logout}>Logout</button>
    </div>
    <FooterNavbar />
    </>
  )
}

export default UserProfile