import { useEffect, useContext, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import SubHeader from "../components/SubHeader"
import { UserContext } from "../context/UserProvider"
import EventCard from '../components/EventCard'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Contests = () => {

    const {user: {client, role}} = useContext(UserContext)

    const [contests, setContests] = useState([])

    function getContests(){
        if(role === "admin"){
            userAxios.get(`/api/event`)
            .then(res => showContests(res.data))
            .catch(err => console.log(err))
        } else {
            userAxios.get(`/api/event/client/${client}`)
                .then(res => showContests(res.data))
                .catch(err => console.log(err))
        }
    }

    function showContests(events){
        const contests = events.filter(event => event.type === "contest")
        setContests(contests)
    }

    const roleRestrictions = ["admin", "commissioner"]

    useEffect(() => {
        getContests()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <SubHeader renderArrow={true} header1={"GAMiNG"} header2={"CONTESTS"} color={"#1c3557"} imgUrl={"/images/contests.png"} />
            <h2>Contests</h2>
            {roleRestrictions.includes(role) ? <Link to={{pathname: "/createevent", state: {type: "Contest", client: client}}}>Create New Contest</Link> : null}
            <fieldset>
                {contests.map(contest => <EventCard key={contest._id} eventObj={contest} name={contest.title} _id={contest._id} date={contest.eventDate} />)}
            </fieldset>
        </>
    )
}

export default Contests