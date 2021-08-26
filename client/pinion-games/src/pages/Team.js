import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router"
import { UserContext } from "../context/UserProvider";
import axios from "axios"

import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import MemberTag from "../components/MemberTag"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FooterNavbar from "../components/FooterNavbar";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Team = () => {

    const location = useLocation()
    const { team, client } = location.state

    const {user: {role}} = useContext(UserContext)

    const [members, setMembers] = useState([])
    const [coach, setCoach] = useState({})
    const [toggle, setToggle] = useState(false)

    function hasPermission(){
        if(role === 'admin'){
            return (
            <>
                {!toggle ? <MoreHorizIcon fontSize={'large'} onClick={handleToggle} /> :
                <div className="action-tool" style={{border: '2px solid black'}}>
                    <div className="close">
                        <CancelIcon onClick={handleToggle}/>
                    </div>
                    <div className="delete">
                        <DeleteIcon onClick={() => console.log('Delete')} />
                        <p>Delete Client</p>
                    </div>
                    <div className="edit">
                        <EditIcon onClick={() => console.log('Edit')}/>
                        <p>Edit Client</p>
                    </div>
                </div>}
            </>
            )
        } else if(role === 'commissioner'){
            return (
            <>
                {!toggle ? <MoreHorizIcon fontSize={'large'} onClick={handleToggle} /> :
                <div className="action-tool" style={{border: '2px solid black'}}>
                    <div className="close">
                        <CancelIcon onClick={handleToggle}/>
                    </div>
                    <div className="delete">
                        <DeleteIcon onClick={() => console.log('Delete')} />
                        <p>Delete Client</p>
                    </div>
                    <div className="edit">
                        <EditIcon onClick={() => console.log('Edit')}/>
                        <p>Edit Client</p>
                    </div>
                </div>}
            </>
            )
        } else {
            return null
        }
    }

    function deleteTeam(_id){
        userAxios.delete(`/api/team/${team._id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }

    function editTeam(inputs, _id){
        userAxios.put(`/api/team/${team._id}`, inputs)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function getTeamMembers(){
        userAxios.get(`/api/team/${team._id}/member`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function handleToggle(){
        setToggle(prevToggle => !prevToggle)
    }


    function getCoach(){
        userAxios.get(`/api/user/${team.coach}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTeamMembers()
    }, [])

    console.log(client)

    return (
        <>
            <Header />
            <SubHeader header1={client.name} header2={team.name}/>
            {hasPermission()}
            <div>
                Coach: {team.coach === null ? <p>Not Assigned</p> : getCoach()}
            </div>
            <label>Team Members:</label>
            { members.length > 0 ?
                members.map(member => <MemberTag key={member._id} member={member} name={member.name} avatar={member.avatar} />) 
            : 
                <p>Currently no members assigned to this team.</p>
            }
            <FooterNavbar />
        </>
    )
}

export default Team