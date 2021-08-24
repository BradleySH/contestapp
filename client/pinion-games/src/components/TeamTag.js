import { Link } from "react-router-dom"

const TeamTag = (props) => {

    const {name, team} = props

    return (
        <div style={{border: '1px solid black'}}>
            <Link to={{
                pathname: '/team',
                state: {
                    team: team
                }
            }}>
            <h2>{name}</h2>
            </Link>
        </div>
    )
}

export default TeamTag