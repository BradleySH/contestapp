import { useState } from 'react'
import { useLocation, useHistory } from 'react-router'
import axios from 'axios'

import SubHeader from '../components/SubHeader'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function CreateEvent(){

    const history = useHistory()
    console.log(history)

    const location = useLocation()
    const { type, client } = location.state

    const initEventInputs = {type: type.toLowerCase(), title: "", eventDate: "", client: client}
    const [eventInputs, setEventInputs] = useState(initEventInputs)
    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState(false)


    function handleChange(e){
        const {name, value} = e.target

        setEventInputs(prevEventInputs => ({...prevEventInputs, [name]: value}))
    }

    function handleStatus(res){
        if(res.status === 201){
            setIsCreated(true)
            setError(false)
        } else {
            setError(true)
            setIsCreated(false)
        }
    }

    function handleSubmit(e){
        e.preventDefault()

        userAxios.post(`/api/event`, eventInputs)
            .then(res => handleStatus(res))
            .catch(err => handleStatus(err))
    }

    return (   
        <>
        <SubHeader renderArrow={true} header1={"CREATE A NEW"} header2={type.toUpperCase()} imgUrl={"/images/contests.png"} />
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder={`Title of ${type}`} onChange={handleChange} />
            <input type="date" name="eventDate" placeholder="Enter Date" onChange={handleChange} />
            <button>Create {type}</button>
            {error ? <p style={{color: 'red'}}>ERROR: {type} was not created</p> : null}
            {isCreated ? history.goBack(1) : null}
            <span style={{color: "red"}}>Cancel</span>
        </form>
        </>
    )
}