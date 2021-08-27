import { Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import "../App.scss"

const TeamTag = (props) => {

    const {name, avatar, team, client} = props

    return (
        <div style={{display: 'inline-block'}}>
        <h2 style={{textAlign: 'center'}}>{name}</h2>
            <Link className='tag' to={{
                pathname: '/team',
                state: {
                    team: team,
                    client: client
                }
            }}>
            <img src={avatar} alt={avatar} style={{width: '145px', height: '145px', borderRadius: '50%'}} />
            </Link>
        </div>
    )
}

export default TeamTag
