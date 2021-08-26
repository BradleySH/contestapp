import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import axios from "axios"
import "../client.scss"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Header from "../components/Header";
import MemberTag from "../components/MemberTag"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Team = () => {

    const location = useLocation()
    const { team, client } = location.state

    const [members, setMembers] = useState([])
    const [coach, setCoach] = useState({})

    function getTeamMembers(){
        userAxios.get(`/api/team/${team._id}/member`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function getCoach(){
        userAxios.get(`/api/user/${team.coach}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTeamMembers()
    }, [])

    console.log(client)

    return (
        <>
            <Header />
            <div className="client-header">
                <p><ArrowBackIosIcon />{client}</p>
                <h3>{team.name}</h3>
                <img src={team.avatar} alt={team.avatar} style={{visibility: 'hidden', width: '200px', height: '200px', borderRadius: '50%'}}/>
            </div>

            <div>
                Coach: {team.coach === null ? <p>Not Assigned</p> : getCoach()}
            </div>
            <label>Team Members:</label>
            { members.length > 0 ?
                members.map(member => <MemberTag key={member._id} member={member} name={member.name} avatar={member.avatar} />) 
            : 
                <p>Currently no members assigned to this team.</p>
            }
        </>
    )
}

export default Team