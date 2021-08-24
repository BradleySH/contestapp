import { Link } from "react-router-dom"

const MemberTag = (props) => {

    const {name, avatar, member} = props

    return (
        <div style={{border: '1px solid black'}}>
            <Link to={{
                pathname: '/member',
                state: {
                    member: member
                }
            }}>
            <h2>Member Name: {name}</h2>
            <img src={avatar} alt={avatar} />
            </Link>
        </div>
    )
}

export default MemberTag