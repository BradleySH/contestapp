import { Link } from "react-router-dom"
import "../client.scss"

const TeamTag = (props) => {

    const {name, avatar, team, client} = props

    return (
        <div style={{border: '1px solid black'}}>
            <Link to={{
                pathname: '/team',
                state: {
                    team: team,
                    client: client
                }
            }}>
            <h2>Team Name: {name}</h2>
            <img src={avatar} alt={avatar} style={{width: '200px', height: '200px', borderRadius: '50%'}} />
            </Link>
        </div>
    )
}

export default TeamTag