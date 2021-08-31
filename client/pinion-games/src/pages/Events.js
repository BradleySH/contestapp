import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserProvider"
import SubHeader from "../components/SubHeader"
import {Link} from "react-router-dom"
import axios from "axios"
import EventCard from '../components/EventCard'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Events = () => {

    const {user: {client, role}} = useContext(UserContext)

    const [events, setEvents] = useState([])

    function showEvents(events){
        const onlyEvents = events.filter(event => event.type === "event")
        setEvents(onlyEvents)
    }

    function getEvents(){

        if(role === "admin"){
            console.log('admin')
            userAxios.get("/api/event")
                .then(res => showEvents(res.data))
                .catch(err => console.log(err))
        } else {
            console.log('general')
            userAxios.get(`/api/event/client/${client}`)
                .then(res => showEvents(res.data))
                .catch(err => console.log(err))
        }

    }

    const roleRestrictions = ["admin", "commissioner"]

    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])

    return(
        <>
            <SubHeader renderArrow={true} header1={"SCHEDULE OF"} header2={"EVENTS"} imgUrl={"/images/events.png"} color={"#1c3557"} />
            <h2>Events</h2>
            { roleRestrictions.includes(role) ? <Link to={{pathname: "/createevent", state: {type: "Event", client: client}}}>Create New Event</Link> : null}
            <fieldset>
                {events.map(event => <EventCard key={event._id} eventObj={event} name={event.title} _id={event._id} date={event.eventDate} />)}
            </fieldset>
        </>
    )
}

export default Events