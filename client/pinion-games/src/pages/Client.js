import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'

import TeamTag from '../components/TeamTag'

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
            .then(res => console.log(res))
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
        <p>{client.name}</p>
        { client.commissioner === null ? <p>No commissioner assigned</p> : getCommissioner()}
        </>
    )
}

export default Client