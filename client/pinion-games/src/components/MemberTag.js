const MemberTag = (props) => {

    const {name, avatar, set, color} = props
    
    return (
        <div style={{backgroundColor: color ? color : 'white'}} onClick={() => set()}>
            <h2>{name}</h2>
            <img src={avatar} alt={avatar} style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
        </div>
    )
}

export default MemberTag