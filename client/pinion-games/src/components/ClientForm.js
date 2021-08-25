import { useState } from "react";
import "../client.scss";

const ClientForm = (props) => {

    const initInputs = {name: '', access: '', commissioner: null}
    const [inputs, setInputs] = useState(initInputs);
    const [toggle, setToggle] = useState(false)

    const {submit} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }


    //   think in order to get this to a modal we will need to wrap the form in a turnary and set the CSS or make separate Modal.js
    //   then just set this form container to a button to open the modal.  My brain is shot though.   We could reuse that modal as well in 
    //   other pages like the commisioner page
    return (
        <fieldset className="form-container">
            <h2>Create a New Client</h2>
            <form className="client-form" onSubmit={(e) => submit(e, inputs)}>
                <input onChange={handleChange} type="text" name="name" value={inputs.name} placeholder="Client Name" />
                <input onChange={handleChange} type="text" name="access" value={inputs.access} placeholder="Access Code" />
                <button>Create Client</button>
            </form>
        </fieldset>
    )
}

export default ClientForm