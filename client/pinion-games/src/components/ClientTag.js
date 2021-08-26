import React, {useState} from "react"
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

    function deleteClient(_id){
        userAxios.delete(`/api/profile/${_id}`)
          .then(res => {
            setClients(prevClients => prevClients.filter(client => client._id !== _id))  // redirects me to /client maybe move this delete into client page then if deleted redirect back to admin profile
          })
          .catch(err => console.log(err))
      }

    const {name, client} = props

    return (
        <Link className="client-tag" to={{
            pathname: '/client',
            state: {
                client: client
            }
        }}>
            <h2>{name}</h2>
            <DeleteIcon onClick={deleteClient} />
            <EditIcon />
        </Link>
    )
}

export default ClientTag