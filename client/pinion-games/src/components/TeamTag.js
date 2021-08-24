import { Link } from "react-router-dom"

const TeamTag = (props) => {

    const {name, avatar, team} = props

    return (
        <div style={{border: '1px solid black'}}>
            <Link to={{
                pathname: '/team',
                state: {
                    team: team
                }
            }}>
            <h2>Team Name: {name}</h2>
            <img src={avatar} alt={avatar} />
            </Link>
        </div>
    )
}

export default TeamTag