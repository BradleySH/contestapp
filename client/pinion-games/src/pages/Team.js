import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { UserContext } from "../context/UserProvider";
import axios from "axios"

import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import MemberTag from "../components/MemberTag"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
    
    // The states below are for the Action Tool(Add Member, Edit, Delete)
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const [actionToggle, setActionToggle] = useState(false)

    const [addToggle, setAddToggle] = useState(false)

    const [editToggle, setEditToggle] = useState(false)
    const initEditInputs = {name: '', avatar: ''}
    const [editInputs, setEditInputs] = useState(initEditInputs)
    
    const [deleteToggle, setDeleteToggle] = useState(false)
    const initDeleteInput = {name: ''}
    const [deleteInput, setDeleteInput] = useState(initDeleteInput)

    // Only allows action tool to User with role = admin or commissioner
    function hasPermission(){
        if(role === 'admin'){
            return (
                <>
                {!actionToggle ? <MoreHorizIcon fontSize={'large'} onClick={handleActionToggle} /> :
                <div className="action-tool" style={{border: '2px solid black'}}>
                    <div className="close" onClick={handleActionToggle} >
                        <CancelIcon />
                    </div>
                    <div className="delete"onClick={() => handleDeleteToggle()} >
                        <DeleteIcon />
                        <p>Delete Team</p>
                    </div>
                    <div className="edit"onClick={() => handleEditToggle()} >
                        <EditIcon />
                        <p>Edit Team</p>
                    </div>
                </div>}
            </>
            )
        } else if(role === 'commissioner'){
            return (
            <>
                {!actionToggle ? <MoreHorizIcon fontSize={'large'} onClick={handleActionToggle} /> :
                <div className="action-tool" style={{border: '2px solid black'}}>
                    <div className="close" onClick={handleActionToggle} >
                        <CancelIcon />
                    </div>
                    <div className="delete"onClick={() => handleDeleteToggle()} >
                        <DeleteIcon />
                        <p>Delete Team</p>
                    </div>
                    <div className="edit"onClick={() => handleEditToggle()} >
                        <EditIcon />
                        <p>Edit Team</p>
                    </div>
                </div>}
            </>
            )
        } else {
            return null
        }
    }

    function handleDeleteToggle(){
        setDeleteToggle(prevDeleteToggle => !prevDeleteToggle)
    }

    function handleChangeDelete(e){
        const {name, value} = e.target

        setDeleteInput(prevDeleteInputs => ({...prevDeleteInputs, [name]: value}))
    }

    function handleDelete(){
        if(editToggle){
            setEditToggle(prevEditToggle => !prevEditToggle)
        }
        return (
            <div>
                <label>To Confirm, Please Enter Team's Name: {`${team.name} = `}</label>
                <input type='text' name='name' value={deleteInput.name} placeholder={team.name} onChange={handleChangeDelete}/>
                <button onClick={() => {deleteInput.name === team.name ? deleteTeam() : window.alert("Entry is wrong")}}>Confirm Delete</button>
            </div>
        )
    }

    function deleteTeam(){
        userAxios.delete(`/api/team/${team._id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }


    function handleEditToggle(){
        setEditToggle(prevEditToggle => !prevEditToggle)
    }

    function handleChangeEdit(e){
        const {name, value} = e.target

        setEditInputs(prevEditInputs => ({...prevEditInputs, [name]: value}))
    }

    function handleEdit(){
        if(deleteToggle){
            setDeleteToggle(prevDeleteToggle => !prevDeleteToggle)
        }
        return (
            <div>
                Edit Team
                <input type="text" name="name" value={editInputs.name} placeholder={team.name} onChange={handleChangeEdit}/>
                <input type="text" name="avatar" value={editInputs.avatar} placeholder={team.avatar} onChange={handleChangeEdit}/>
                <button onClick={() => editTeam()}>Confirm Edit</button>
            </div>
        )
    }

    function editTeam(){
        userAxios.put(`/api/team/${team._id}`, editInputs)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    function getTeamMembers(){
        userAxios.get(`/api/user/team/${team._id}`)
            .then(res => setMembers(res.data))
            .catch(err => console.log(err))
    }

    function handleActionToggle(){
        setActionToggle(prevActionToggle => !prevActionToggle)
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
            <SubHeader header1={client.name} header2={team.name}/>
            {hasPermission()}
            {editToggle ? handleEdit() : null}
            {deleteToggle ? handleDelete() : null}
            <div>
                Coach: {team.coach === null ? <p>Not Assigned</p> : getCoach()}
            </div>
            <label>Team Members:</label>
            { members.length > 0 ?
                members.map(member => <MemberTag key={member._id} member={member} name={member.name} avatar={member.avatar} set={() => console.log("set")}/>) 
            : 
                null
            }
            {role === 'admin' ? 
                
                <Link to={{pathname: '/addteammember', state: {team, client}}}
                    style={{
                        borderRadius: '50%', 
                        boxShadow: '0 0 10px blue', 
                        backgroundColor: 'grey',
                        color: 'white', 
                        display: 'grid', 
                        fontSize: '24px', 
                        height: '145px',
                        margin: '16px', 
                        placeItems: 'center', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        width: '145px',
                    }}>
                <PersonAddIcon />
                </Link>
                :
                role === 'commissioner' ? 
                    
                <Link to={{pathname: '/addteammember', state: {team, client}}}
                    style={{
                        borderRadius: '50%', 
                        boxShadow: '0 0 10px blue', 
                        backgroundColor: 'grey',
                        color: 'white', 
                        display: 'grid', 
                        fontSize: '24px', 
                        height: '145px',
                        margin: '16px', 
                        placeItems: 'center', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        width: '145px',
                    }}>
                <PersonAddIcon />
                </Link>
                :
                null
            }
        </>
    )
}

export default Team