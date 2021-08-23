import { useState } from "react"

const ClientForm = (props) => {

    const initInputs = {name: '', access: '', commissioner: null}
    const [inputs, setInputs] = useState(initInputs)

    const {submit} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    return (
        <fieldset>
            <h2>Create a New Client</h2>
            <form onSubmit={(e) => submit(e, inputs)}>
                <input onChange={handleChange} type="text" name="name" value={inputs.name} placeholder="Client Name" />
                <input onChange={handleChange} type="text" name="access" value={inputs.access} placeholder="Access Code" />
                <button>Create Client</button>
            </form>
        </fieldset>
    )
}

export default ClientForm