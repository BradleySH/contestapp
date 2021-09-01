import { Link } from "react-router-dom";
import "../styles/eventSet.scss";

export default function EventCard(props){

    const {date, name, eventObj} = props

    const formattedDate = new Date(date).toLocaleDateString()

    return (
        <div className="event-card">
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