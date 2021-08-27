import { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router";
import axios from 'axios'

import Search from "../components/Search";
import MemberTag from "../components/MemberTag";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AddTeamMember(){

    const location = useLocation()
    const { team, client} = location.state
    
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedMembers, setSelectedMembers] = useState([])

    function getClientUsers(){
        userAxios(`/api/user/client/${client._id}`)
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }

    function showCurrentMembers(){
        users.forEach(user => {
            if(user.team === team._id){
                return selectedMembers.push(user._id)
            } else {
                return null
            }
        })
    }

    function showClientUsers(){
        return (
            <div>
                {users.map(user => <MemberTag key={user._id} _id={user._id} color={selectedMembers.includes(user._id) ? 'green' : 'white'} name={`${user.firstName} ${user.lastName}`} avatar={user.avatar} set={() => selectMember(user._id)} />)}
            </div>
        )
    }

    function selectMember(_id){
        if(selectedMembers.includes(_id)){
            const copy = selectedMembers.slice()
            const updatedMembers = copy.filter(id => id !== _id)
            console.log(updatedMembers)
            setSelectedMembers(updatedMembers)
        } else {
            setSelectedMembers(prevSelectedMembers => [...prevSelectedMembers, _id])
        }
    }

    function addTeamMembers(){
        const membersToUpdate = {
            members: selectedMembers
        }

        userAxios.put(`/api/user/team/${team._id}`, membersToUpdate)
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
                {filteredUsers.map(user => <MemberTag  key={user._id} _id={user._id} color={selectedMembers.includes(user._id) ? 'green' : 'white'} name={`${user.firstName}  ${user.lastName}`} avatar={user.avatar} set={() => selectMember(user._id)} />)}
            </div>
        )
    }

    useEffect(() => {
        getClientUsers()
    }, [])

    return (
        <>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button onClick={() => addTeamMembers()} >Submit Team Members</button>
        {users.length > 0 ? showCurrentMembers() : null}
        {searchQuery.length > 0 ? handleSearch() : showClientUsers()}
        </>
    )
}