const Client = (props) => {

    const {_id, name, commissioner} = props

    return (
        <div>
            <h2>{name}</h2>
            <h3>{_id}</h3>
            <h3>{!commissioner ? "No Commissioner Assigned" : {commissioner}}</h3>
        </div>
    )
}

export default Client