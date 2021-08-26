import React, {useState} from "react"
import { Link } from "react-router-dom";
import "../client.scss"
import axios from "axios"

const userAxios = axios.create()   // took this from Admin.js to text it out 
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const ClientTag = (props) => {

    const initState = []  //  state as well taken from Admin.js
    const [clients, setClients] = useState(initState)



    const {name, client} = props

    return (
        <Link className="client-tag" to={{
            pathname: '/adminclient',
            state: {
                client: client
            }
        }}>
            <h2>{name}</h2>
        </Link>
    )
}

export default ClientTag