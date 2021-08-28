import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation, Redirect } from 'react-router';

import "../App.scss"
import "../client.scss"
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Header from "../components/Header";
import SubHeader from '../components/SubHeader'
import Search from '../components/Search';
import MemberTag from '../components/MemberTag';
import TeamTag from '../components/TeamTag'
import FooterNavbar from "../components/FooterNavbar";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const AdminClient = () => {

    const location = useLocation()
    const {client} = location.state

    const [commissioner, setCommissioner] = useState({})
    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])
    
    // The states below are for the Action Tool(Edit, Delete)
    const [actionToggle, setActionToggle] = useState(false)

    const initEditInputs = {name: client.name, access: client.access, commissioner: client.commissioner}
    const [editInputs, setEditInputs] = useState(initEditInputs)
    const [editToggle, setEditToggle] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const initDeleteInput = {name: ''}
    const [deleteInput, setDeleteInput] = useState(initDeleteInput)
    const [deleteToggle, setDeleteToggle] = useState(false)

    // Client Action Tools
    function handleActionToggle(){
        if(editToggle){
            setEditToggle(prevEditToggle => !prevEditToggle)
        }
        if (deleteToggle){
            setDeleteToggle(prevDeleteToggle => !prevDeleteToggle)

        }
        setActionToggle(prevActionToggle => !prevActionToggle)
    }

    // Delete a Client
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
        if(deleteToggle){
            return (
                <div>
                    <label>To Confirm, Please Enter Client's Name: {`${client.name} = `}</label>
                    <input type='text' name='name' value={deleteInput.name} placeholder={client.name} onChange={handleChangeDelete}/>
                    <button onClick={() => {deleteInput.name === client.name ? deleteClient() : window.alert("Entry is wrong")}}>Confirm Delete</button>
                </div>
            )
        } else {
            return null
        }
    }

    function deleteClient(_id){
        userAxios.delete(`/api/client/${client._id}`)
          .then(res => {console.log(res.data)})
          .catch(err => console.log(err))
    }

    // Edit a Client
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
        if(editToggle){
            return (
                <div>
                    <input type='text' onChange={handleChangeEdit} name='name' value={editInputs.name} placeholder='Client Name' />
                    <input type='text' onChange={handleChangeEdit} name='access' value={editInputs.access} placeholder='Access Code'/>
                    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <button onClick={() => {editClient(editInputs)}}>Submit</button>
                    {searchQuery.length > 0 ? handleSearch() : <p>Waiting for Search Input...</p>}
                </div>
            )
        } else {
            return null
        }
    }

    function editClient(inputs){

        userAxios.put(`/api/client/${client._id}`, inputs)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        setSearchQuery('')
        handleActionToggle()
    }

    // Edit a client commissioner using a search that filters throught Client's users
    function setNewCommissioner(_id){
        setEditInputs(prevEditInputs => ({...prevEditInputs, commissioner: _id}))
    }

    function handleSearch(){
        
        const filteredUsers = users.filter(user => {
            if(!user.firstName){
                return
            }
            const userName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`
            return userName.includes(searchQuery.toLowerCase())
        })

        return (
            <div>
                {filteredUsers.map(user => <MemberTag name={`${user.firstName} ${user.lastName}`} role={user.role} avatar={user.avatar} set={() => setNewCommissioner(user._id)} />)}
            </div>
        )
    }

    // Grabs Client's Users
    function getUsers(){
        userAxios(`/api/user/client/${client._id}`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }

    // Grabs Teams for Client
    function getTeams(){
        userAxios.get(`/api/team/client/${client._id}`)
            .then(res => {
                setTeams(res.data)
            })
            .catch(err => console.log(err))
    }

    // Populates Commissioner Data
    function getCommissioner(){
        console.log(`Commissioner: ${client.commissioner}`)
        userAxios.get(`/api/user/${client.commissioner}`)
            .then(res => setCommissioner(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        
        getCommissioner()
        getUsers()
        getTeams()

    }, [])

    return (
        <>
        <Header />
        <SubHeader header1={client.name} header2={'TEAMS'}/>
        {!actionToggle ? <MoreHorizIcon fontSize={'large'} onClick={handleActionToggle} /> :         
        <div className="action-tool" style={{border: '2px solid black'}}>
            <div className="close">
                <CancelIcon onClick={handleActionToggle}/>
            </div>
            <div className="delete" onClick={() => handleDeleteToggle()}>
                <DeleteIcon />
                <p>Delete Client</p>
            </div>
            <div className="edit" onClick={() => handleEditToggle()}>
                <EditIcon />
                <p>Edit Client</p>
            </div>
        </div>}
        {editToggle ? handleEdit() : null}
        {deleteToggle ? handleDelete() : null}
        <div className="comm-container">
            <p>
                Commissioner: {commissioner.firstName === undefined ? 'No commissioner assigned' : `${commissioner.firstName} ${commissioner.lastName}`}
            </p>
            <div style={{margin: '16px', display: 'flex', placeItems: 'center'}}>
                {teams.map(team => <TeamTag 
                                        key={team._id} 
                                        team={team} 
                                        client={client} 
                                        name={team.name} 
                                        avatar={team.avatar} 
                                    />
                )}
  
                <Link to={{
                    pathname: '/createteam',
                    state: {
                        client
                    }
                }}
                        style={{
                            width: '145px', 
                            height: '145px', 
                            borderRadius: '50%', 
                            boxShadow: '0 0 10px blue', 
                            display: 'grid', 
                            placeItems: 'center', 
                            color: '#1c3557', 
                            fontSize: '24px', 
                            textAlign: 'center', 
                            textDecoration: 'none'
                        }}
                >
                + NEW TEAM
                </Link>
            </div>
            <FooterNavbar />
        </div>
        </>
    )
}

export default AdminClient