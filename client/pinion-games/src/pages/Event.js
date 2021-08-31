import { useLocation, useHistory } from "react-router";
import { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/UserProvider";
import SubHeader from "../components/SubHeader";
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})



export default function Event(){

    const location = useLocation()
    const { eventObj } = location.state

    const history = useHistory()
    
    const {user: {role}} = useContext(UserContext)

    const [toggle, setToggle] = useState(false)

    const formattedDate = new Date(eventObj.eventDate).toLocaleDateString()

    function deleteEvent(){
        userAxios.delete(`/api/event/${eventObj._id}`)
        history.goBack(1)
    }

    function editEvent(){
        // userAxios.put(`/event/${eventObj._id}`)
        console.log("Edit route isn't completed, delete event instead.")
    }

    function handleToggle(){
        setToggle(prevToggle => !prevToggle)
    }

    const roleRestrictions = ["admin", "commissioner"] 

    function showActionTool(){
            if(!toggle){
                return ( 
                    <div onClick={handleToggle}>
                        <MoreHorizIcon />
                    </div>
                )
            } else if(toggle){
                return (
                    <div>
                        <CancelIcon onClick={handleToggle} />
                        <div onClick={deleteEvent}>
                            <DeleteIcon />
                            <p>Delete</p>
                        </div>
                        <div onClick={editEvent}>
                            <EditIcon />
                            <p>Edit</p>
                        </div>
                    </div>
                )
            }
    }

    return (
        <>
            <SubHeader renderArrow={true} header1={eventObj.type} />
            {roleRestrictions.includes(role) ? showActionTool() : null}
            <h1>{eventObj.title}</h1>
            <h2>{formattedDate}</h2>
            
        </>
    )
}