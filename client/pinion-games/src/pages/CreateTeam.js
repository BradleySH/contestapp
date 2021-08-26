import axios from 'axios'
import { useLocation, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import "../App.scss"

import Header from "../components/Header"
import SubHeader from '../components/SubHeader'
import TeamForm from "../components/TeamForm"
import FooterNavbar from "../components/FooterNavbar";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const CreateTeam = () => {

    const location = useLocation()
    const {client} = location.state

    function createTeam(e, inputs){
        e.preventDefault()

        userAxios.post(`/api/team/client/${client._id}`, inputs)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header />
            <SubHeader header1={'CREATE A NEW'} header2={'TEAM'}/>
            <TeamForm submit={createTeam} />
            <FooterNavbar />
        </>
    )

}

export default CreateTeam