import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import {UserContext} from "../context/UserProvider";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarsIcon from '@material-ui/icons/Stars';


const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProfile = () => {
  const { user: { firstName, avatar, team, client }, logout} = useContext(UserContext)

  const [teamInfo, setTeamInfo] = useState({})
  const [teamMembers, setTeamMembers] = useState([])
  const [teams, setTeams] = useState([])
  
  function getTeamInfo(){
    userAxios.get(`/api/team/${team}`)
      .then(res => setTeamInfo(res.data))
      .catch(err => console.log(err))
  }

  function getTeamMembers(){
    userAxios.get(`/api/user/team/${team}`)
      .then(res => setTeamMembers(res.data))
      .catch(err => console.log(err))
  }

    // Grabs Teams for Client
    function getTeams(){
      userAxios.get(`/api/team/client/${client}`)
          .then(res => {
              setTeams(res.data)
          })
          .catch(err => console.log(err))
  }

  useEffect(() => {
    getTeamInfo()
    getTeamMembers()
    getTeams()
    // eslint-disable-next-line
  }, [])

  console.log(typeof teamInfo.avatar)
  return (
    <>
    <div className="team-name">
      <p><span>Team</span> {teamInfo.name}</p>
      <div style={{backgroundImage: `url(${teamInfo.avatar})`, backgroundSize: 'cover'}} className="circle"></div>
    </div>
    <div className="user">
      <div className="stats">
        <div className="user-stats">
        <div className="user">
        <img src={avatar} alt={avatar} />
        <p>Welcome, @{firstName}!</p>
      </div>
        <div className="cash">
            <AttachMoneyIcon />
            <p>${teamInfo.currency}</p>
        </div>
        <div className="points">
            <p>Total Points: {teamInfo.points}</p>
        </div>
        <div className="standing">
            <p>*1st</p>
        </div>
        </div>
        
        <p className="team-title">Team Members</p>
        <div className="team-members">
          <div className="coach">
            <StarsIcon style={{ color: "gray", height: "40px", width: "40px"}} />
            <p>Captain</p>
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
    </>
  )
}

export default UserProfile