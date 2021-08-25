import { useState, useEffect } from "react"
import axios from "axios"

import Header from "./Header"
import ClientTag from "./ClientTag"
import ClientForm from "./ClientForm"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Admin = () => {

  const initState = []
  const [clients, setClients] = useState(initState)
  
  function getClients(){
    userAxios.get("/api/client")
      .then(res => {
        setClients(res.data)
      })
      .catch(err => console.log(err))
  }
  
  function createClient(e, inputs){
    e.preventDefault()
    
    userAxios.post("/api/client", inputs)
    .then(res => setClients(prevClients => ([...prevClients, res.data])))
    .catch(err => console.log(err))
  }

  function deleteClient(_id){
    userAxios.delete(`/api/client/${_id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  function editClient(inputs, _id){
    const clientObj = {
      name: inputs.name,
      access: inputs.access,
      commissioner: inputs.commissioner
    }

    userAxios.put(`/api/client/${_id}`, clientObj)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  function getUsers(){
    userAxios.get("/api/users")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getClients()
    getUsers()
  }, [])

  return (
    <>
    <Header />
    <div className="admin-client">
      <div className="admin-header">
        <h1>ADMiN</h1>
      </div>
      <div className="client-grid">
        {clients.map(client => <ClientTag key={client._id} client={client} _id={client._id} name={client.name} commissioner={client.commissioner}/>)}
        <ClientForm submit={createClient} />
      </div>
    </div>
    </>
  )
}

export default Admin