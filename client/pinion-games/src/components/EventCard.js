import { Link } from "react-router-dom"

export default function EventCard(props){

    const {date, name, eventObj} = props

    const formattedDate = new Date(date).toLocaleDateString()

    return (
        <div style={{border: '1px solid black', padding: '10px'}}>
            <Link to={{
                pathname:'/event',
                state: {
                    eventObj
                }
            }}>
            <p>{formattedDate}</p>
            <h3>{name}</h3>
            </Link>
        </div>
    )
}