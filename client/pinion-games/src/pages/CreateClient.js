import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../client.scss"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios'

import Header from "../components/Header"
import ClientForm from "../components/ClientForm"
import FooterNavbar from "../components/FooterNavbar";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const CreateClient = () => {

    function createClient(e, inputs){
        e.preventDefault()
        
        userAxios.post("/api/client", inputs)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        return <Redirect to='/profile' />
    }

    return(
        <div>
            <Header />
            <div className="client-header">
                <p><Link to='/profile'><ArrowBackIosIcon onClick={() => <Redirect to={"/admin"} />} /></Link> Create a New</p>
                <h2>Client</h2>
            </div>
            <ClientForm submit={createClient} />
            <FooterNavbar />
        </div>
    )
}

export default CreateClient