import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TeamTag from '../components/TeamTag'
import TeamForm from '../components/TeamForm'
import "../client.scss"
import Header from "../components/Header";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Client = () => {

    const location = useLocation()
    const { client } = location.state

    const [commissioner, setComissioner] = useState({})
    const [teams, setTeams] = useState([])

    function getTeams(){
        userAxios.get(`/team/${client._id}`)
            .then(res => {
                setTeams(res.data)
            })
            .catch(err => console.log(err))
    }

    function createTeam(e, inputs){
        e.preventDefault()

        userAxios.post(`/team/${client._id}`, inputs)
            .then(res => {
                setTeams(prevTeams => ([...prevTeams, res.data]))
            })
            .catch(err => console.log(err))
    }

    function getCommissioner(){
        userAxios.get(`/users/${client.commissioner}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        getTeams()

    }, [])

    return (
        <>
        <Header />
        <div className="client-header">
            <p><ArrowBackIosIcon />{client.name}</p>
        </div>
        <div className="comm-container">
            { client.commissioner === null ? <p>No commissioner assigned</p> : getCommissioner()}
            <label>Add Team</label>
            <TeamForm submit={createTeam}/>
            {teams.length > 0 ? teams.map(team => <TeamTag key={team._id} team={team} name={team.name} avatar={team.avatar} />) : <p>Currently no teams in this client</p>}
        </div>
           
        </>
    )
}

export default Client