import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import axios from "axios";

import DeleteIcon from '@material-ui/icons/Delete';

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const MemberTag = (props) => {

    const {name, avatar, set, color, _id} = props

    const {user: {role}} = useContext(UserContext)

    function deleteUser(){
        userAxios.delete(`/api/user/${_id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const roleRestrictions = ["admin", "commissioner"]
    
    return (
        <div style={{backgroundColor: color ? color : 'white'}} onClick={() => set()}>
            <h2>{name}</h2>
            <img src="/images/defaultprofile.png" alt="/images/defaultprofile.png" style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
            {roleRestrictions.includes(role) ? 
                <div>
                    <DeleteIcon onClick={deleteUser} />
                </div>
                :
                null
            }
        </div>
    )
}

export default MemberTag