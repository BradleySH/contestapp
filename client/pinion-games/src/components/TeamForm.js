import {useState} from 'react'

const TeamForm = (props) => {

    const {submit} = props

    const initInputs = {name: '', avatar: ''}
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const {name, value} = e.target

        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    return (
        <form onSubmit={(e) => submit(e, inputs)}>
            <label>Create Team</label>
            <input type='text' onChange={handleChange} name='name' value={inputs.name} placeholder='Team Name' />
            <input type='text' onChange={handleChange} name='avatar' value={inputs.avatar} placeholder='Avatar/Image' />
            <button>Submit</button>
        </form>
    )
}

export default TeamForm