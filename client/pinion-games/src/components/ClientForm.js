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
                return
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
        <fieldset className="form-container">
            <h2>Create a New Client</h2>
            <form className="client-form" onSubmit={(e) => submit(e, inputs)}>
                <label>Client Name</label>
                <input onChange={handleChange} type="text" name="name" value={inputs.name} placeholder="Client Name" />
                <br />
                <label>Access Code</label>
                <input onChange={handleChange} type="text" name="access" value={inputs.access} placeholder="Access Code" />
                <br />
                <label>Assign a Commissioner</label>
                <div>
                    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    {searchQuery.length > 0 ? handleSearch() : null}
                </div>
                <button>Next</button>
            </form>
        </fieldset>
    )
}

export default ClientForm