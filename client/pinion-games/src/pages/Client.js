import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router'
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

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
        <Header />
        <div className="client-header">
            <p><ArrowBackIosIcon /> {clientInfo.name}</p>
            <h2>TEAMS</h2>
        </div>
        <div className="comm-container">
            <p>
                Commissioner: {commissioner.firstName === undefined ? 'No commissioner assigned' : `${commissioner.firstName} ${commissioner.lastName}`}
            </p>
            <div style={{margin: '16px'}}>
                {teams.map(team => <TeamTag 
                                        key={team._id} 
                                        team={team} 
                                        client={client.name} 
                                        name={team.name} 
                                        avatar={team.avatar} 
                                    />
                )}
                {role === 'admin' ? 
                    
                <Link to='/createteam' 
                    style={{
                        borderRadius: '50%', 
                        boxShadow: '0 0 10px blue', 
                        backgroundColor: 'grey',
                        color: 'white', 
                        display: 'grid', 
                        fontSize: '24px', 
                        height: '145px',
                        margin: '16px', 
                        placeItems: 'center', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        width: '145px',
                    }}>
                + NEW TEAM
                </Link>
                :
                role === 'commissioner' ? 
                    
                <Link to={{pathname: '/createteam', state: {clientInfo}}}
                    style={{
                        borderRadius: '50%', 
                        boxShadow: '0 0 10px blue', 
                        backgroundColor: 'grey',
                        color: 'white', 
                        display: 'grid', 
                        fontSize: '24px', 
                        height: '145px',
                        margin: '16px', 
                        placeItems: 'center', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        width: '145px',
                    }}>
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