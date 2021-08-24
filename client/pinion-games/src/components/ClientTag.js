import { Link } from "react-router-dom"

const ClientTag = (props) => {

    const {name, client} = props

    return (
        <div style={{border: '1px solid black'}}>
            <Link to={{
                pathname: '/client',
                state: {
                    client: client
                }
            }}>
            <h2>{name}</h2>
            </Link>
        </div>
    )
}

export default ClientTag