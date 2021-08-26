import { Link } from "react-router-dom";
import "../client.scss"

const ClientTag = (props) => {

    const {name, client} = props

    return (
        <Link className="client-tag" to={{
            pathname: '/client',
            state: {
                client: client
            }
        }}>
            <h2>{name}</h2>
        </Link>
    )
}

export default ClientTag