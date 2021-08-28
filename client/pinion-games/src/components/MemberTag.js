import { useState } from "react"
import { Link } from "react-router-dom"

const MemberTag = (props) => {

    const {name, avatar, set, color} = props
    
    return (
        <div style={{backgroundColor: color ? color : 'white'}} onClick={() => set()}>
            <h2>{name}</h2>
            <img src='https://images.unsplash.com/photo-1569999134619-556cbdca0f14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1494&q=80' alt='default profile' style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
        </div>
    )
}

export default MemberTag