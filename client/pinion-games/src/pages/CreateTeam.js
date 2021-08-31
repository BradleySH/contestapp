import { useState } from 'react'
import axios from 'axios'
import { useLocation, Redirect } from 'react-router'
import "../App.scss"

import SubHeader from '../components/SubHeader'
import TeamForm from "../components/TeamForm"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const CreateTeam = () => {

    const [didSubmit, setDidSubmit] = useState(false)

    const location = useLocation()
    const {client} = location.state

    function createTeam(e, inputs){
        e.preventDefault()

        setDidSubmit(true)

        userAxios.post(`/api/team/client/${client._id}`, inputs)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            {didSubmit ? <Redirect to={{
                pathname: "/adminclient",
                state: {
                    client
                }
            }} /> : null}
            <SubHeader header1={'CREATE A NEW'} header2={'TEAM'}/>
            <TeamForm submit={createTeam} style={{ height: "100%", width: "100vw"}} />
        </>
    )

}

export default CreateTeam