import axios from 'axios'
import { useLocation, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import "../client.scss"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Header from "../components/Header"
import TeamForm from "../components/TeamForm"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const CreateTeam = () => {

    const location = useLocation()
    const {clientInfo} = location.state

    function createTeam(e, inputs){
        e.preventDefault()

        userAxios.post(`/api/team/client/${clientInfo._id}}`, inputs)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header />
            <div className="client-header">
                <p><Link to='/profile'><ArrowBackIosIcon /></Link> Create a New</p> // tried to use a redirect here with no luck
                <h2>Team</h2>
            </div>
            <TeamForm submit={createTeam} />
        </>
    )

}

export default CreateTeam