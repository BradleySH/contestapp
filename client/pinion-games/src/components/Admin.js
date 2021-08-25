import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Header from "./Header"
import ClientTag from "./ClientTag"

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
  
  useEffect(() => {
    getClients()
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
        <Link to='/createclient' style={{width: '145px', height: '145px', borderRadius: '50%', boxShadow: '0 0 10px blue', display: 'grid', placeItems: 'center', color: '#1c3557', fontSize: '24px', textAlign: 'center', textDecoration: 'none'}}>
        + NEW CLiENT
        </Link>
      </div>
    </div>
    </>
  )
}

export default Admin