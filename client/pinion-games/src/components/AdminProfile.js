import { useState, useEffect } from "react"
import axios from "axios"

import Header from "./Header"
import Client from "./Client"
import ClientForm from "./ClientForm"

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const AdminProfile = () => {

  const initState = []
  const [clients, setClients] = useState(initState)
  
  function getClients(){
    userAxios.get("/api/client")
      .then(res => {
        setClients(res.data)
      })
      .catch(err => console.log(err))
  }

  function getUsers(){
    userAxios.get("/api/users")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  function createClient(e, inputs){
    e.preventDefault()

    userAxios.post("/api/client", inputs)
      .then(res => setClients(prevClients => ([...prevClients, res.data])))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getClients()
    getUsers()
  }, [])

  return (
    <>
    <Header />
    <div>
      <h1>ADMiN</h1>
      <h2>Your Clients</h2>
      {clients.map(client => <Client key={client._id} _id={client._id} name={client.name} commissioner={client.commissioner}/>)}
      <ClientForm submit={createClient} />
    </div>
    </>
  )
}

export default AdminProfile