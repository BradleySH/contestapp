import { useState } from "react"
import { Link } from "react-router-dom"

const MemberTag = (props) => {

    const {name, avatar, member, role, set} = props

    const [toggle, setToggle] = useState(false)

    function handleToggle(){
        setToggle(prevToggle => !prevToggle)
    }
    
    if(set === 'undefined'){
       return set = console.log('Nothing was assigned to props.set in MemberTag')
    }

    console.log('render')

    return (
        <div onClick={() => handleToggle()} style={{border: `2px solid ${role === 'commissioner' ? 'green' : 'black'}`, padding: '20px'}} onClick={() => set()}>
            <Link to={{
                pathname: '/member',
                state: {
                    member: member
                }
            }}>
            <h2>{name}</h2>
            <img src='https://images.unsplash.com/photo-1569999134619-556cbdca0f14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1494&q=80' alt='default profile' style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
            </Link>
        </div>
    )
}

export default MemberTag