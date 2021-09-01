import { useState, useEffect } from "react";
import "../client.scss";
import axios from "axios"

import Search from "./Search";
import MemberTag from "./MemberTag";

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const ClientForm = (props) => {

    const initInputs = {name: '', access: '', commissioner: null}
    const [inputs, setInputs] = useState(initInputs)
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')


    const {submit} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function getUsers(){
        userAxios.get("/api/user")
          .then(res => {
              setUsers(res.data)
          })
          .catch(err => console.log(err))
    }

    function setCommissioner(_id){
        setInputs(prevInputs => ({...prevInputs, commissioner: _id}))
    }

    function handleSearch(){
        
        const filteredUsers = users.filter(user => {
            if(!user.firstName){
                return false
            }
            const userName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`
            return userName.includes(searchQuery.toLowerCase())
        })

        return (
            <div>
                {filteredUsers.map(user => <MemberTag name={`${user.firstName} ${user.lastName}`} avatar={user.avatar} set={() => setCommissioner(user._id)} />)}
            </div>
        )
    }

    useEffect(() => {
        getUsers()
    }, [])


    //   think in order to get this to a modal we will need to wrap the form in a turnary and set the CSS or make separate Modal.js
    //   then just set this form container to a button to open the modal.  My brain is shot though.   We could reuse that modal as well in 
    //   other pages like the commisioner page
    return (
        <div className="form-container">
            <form className="client-form" onSubmit={(e) => submit(e, inputs)}>
                <div className="client-name">
                    <label>Client Name</label>
                    <input onChange={handleChange} type="text" name="name" value={inputs.name} placeholder="Client Name" />
                    <label>Access Code</label>
                    <input onChange={handleChange} type="text" name="access" value={inputs.access} placeholder="Access Code" />
                </div>

                <label className="assign-comm">Assign a Commissioner</label>
                <div className="assign-user">
                    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    {searchQuery.length > 0 ? handleSearch() : null}
                </div>
                <button className="nextbtn">Next</button>
            </form>
        </div>
    )
}

export default ClientForm