import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

import Admin from '../components/Admin'
import User from '../components/User'

const Profile = () => {

    const {user: {role}} = useContext(UserContext)

    return (
        <>
        {
            role === 'general' ? <User/> 
            : role === 'commissioner' ? <User />
            : role === 'admin' ? <Admin /> 
            : <h1>Please Contact Support</h1>
        }
        </>
    )
}

export default Profile