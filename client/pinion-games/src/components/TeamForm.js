import {useState} from 'react'

const TeamForm = () => {

    const initInputs = {name: '', avatar: ''}
    const [inputs, setInputs] = useState(initInputs)

    return (
        <div>
            <label>Create Team</label>
            <input type='text' name='name' value={inputs.name} placeholder='Team Name' />
            <input type='text' name='avatar' value={inputs.avatar} placeholder='Avatar/Image' />
            <button>Submit</button>
        </div>
    )
}

export default TeamForm