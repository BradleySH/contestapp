import { useLocation } from "react-router"

const Team = () => {

    const location = useLocation()
    const { team } = location.state

    return (
        <>
            <p>Specific Team Page</p>
        </>
    )
}

export default Team