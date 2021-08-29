import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

import TeamTag from '../components/TeamTag'
import "../App.scss"
import "../client.scss"
import Header from "../components/Header";
import SubHeader from '../components/SubHeader'
import FooterNavbar from "../components/FooterNavbar";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Client = () => {

    const { user: {client, role} } = useContext(UserContext)

    const [clientInfo, setClientInfo] = useState({})
    const [commissioner, setCommissioner] = useState({})
    const [teams, setTeams] = useState([])

    function getTeams(){
        userAxios.get(`/api/team/client/${client}`)
            .then(res => {
                setTeams(res.data)
            })
            .catch(err => console.log(err))
    }

    function getClient(){
        userAxios.get(`/api/client/${client}`)
            .then(res => {
                setClientInfo(res.data)
                getCommissioner(res.data.commissioner)
            })
            .catch(err => console.log(err))
    }

    function getCommissioner(_id){
        userAxios.get(`/api/user/${_id}`)
            .then(res => setCommissioner(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        
        getClient()
        getTeams()

    }, [])

    return (
        <>
        <SubHeader header1={clientInfo.name} header2={'TEAMS'}/>
        <div className="comm-container">
            <div>
                <p>
                    Commissioner: {commissioner.firstName === undefined ? 'No commissioner assigned' : `${commissioner.firstName} ${commissioner.lastName}`}
                </p>
            </div>
            
            <div className="team-list" style={{margin: '16px'}}>
                {teams.map(team => <TeamTag 
                                        key={team._id} 
                                        team={team} 
                                        client={clientInfo} 
                                        name={team.name} 
                                        avatar={team.avatar} 
                                    />
                )}
                {role === 'admin' ? 
                    
                <Link to='/createteam'>
                + NEW TEAM
                </Link>
                :
                role === 'commissioner' ? 
                    
                <Link to={{pathname: '/createteam', state: {clientInfo}}}>
                + NEW TEAM
                </Link>
                :
                null
                
            }
            </div>
        </div>
        </>
    )
}

export default Client