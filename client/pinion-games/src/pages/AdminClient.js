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
    const [toggle, setToggle] = useState(false)
    const [termClient, setTermClient] = useState([])

    const initEditInputs = {name: client.name, access: client.access, commissioner: client.commissioner}
    const [editInputs, setEditInputs] = useState(initEditInputs)
    const [editToggle, setEditToggle] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    

    function deleteClient(_id){
        const result = window.confirm("Are you sure you want to delete?");
        userAxios.delete(`/api/client/${client._id}`)
          .then(res => {
              if(result){
                setTermClient(prevTermClients => prevTermClients.filter(client => client._id !== _id))
              }
                  
          })
          .catch(err => console.log(err))
    }

    function handleChange(e){
        const {name, value} = e.target

        setEditInputs(prevEditInputs => ({...prevEditInputs, [name]: value}))
    }

    function handleEdit(){
        if(editToggle){
            return (
                <div>
                    <input type='text' onChange={handleChange} name='name' value={editInputs.name} placeholder='Client Name' />
                    <input type='text' onChange={handleChange} name='access' value={editInputs.access} placeholder='Access Code'/>
                    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <button onClick={() => {editClient(editInputs)}}>Submit</button>
                    {searchQuery.length > 0 ? handleSearch() : <p>Waiting for Search Input...</p>}
                </div>
            )
        } else {
            return null
        }
    }

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

    function editClient(inputs){

        userAxios.put(`/api/client/${client._id}`, inputs)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        setSearchQuery('')
        handleToggle()
    }

    function handleToggle(){
        if(editToggle){
            setEditToggle(prevEditToggle => !prevEditToggle)
        }
        setToggle(prevToggle => !prevToggle)
    }

    function handleEditToggle(){
        setEditToggle(prevEditToggle => !prevEditToggle)
    }

    function getUsers(){
        userAxios(`/api/user/client/${client._id}`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }

    function getTeams(){
        userAxios.get(`/api/team/${client._id}`)
            .then(res => {
                setTeams(res.data)
            })
            .catch(err => console.log(err))
    }

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
        {!toggle ? <MoreHorizIcon fontSize={'large'} onClick={handleToggle} /> :         
        <div className="action-tool" style={{border: '2px solid black'}}>
            <div className="close">
                <CancelIcon onClick={handleToggle}/>
            </div>
            <div className="delete">
                <DeleteIcon onClick={deleteClient} />
                <p>Delete Client</p>
            </div>
            <div className="edit" onClick={() => handleEditToggle()}>
                <EditIcon />
                <p>Edit Client</p>
            </div>
        </div>}
        {handleEdit()}
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