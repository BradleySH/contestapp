import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import axios from "axios"

import MemberTag from "../components/MemberTag"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Team = () => {

    const location = useLocation()
    const { team } = location.state

    const [members, setMembers] = useState([])
    const [coach, setCoach] = useState({})

    function getTeamMembers(){
        userAxios.get(`/team/${team._id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function getCoach(){
        userAxios.get(`/users/${team.coach}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log('Get Team Members')
    }, [])

    return (
        <>
            <p>{team.name}</p>
            <img src={team.avatar} alt={team.avatar}/>
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