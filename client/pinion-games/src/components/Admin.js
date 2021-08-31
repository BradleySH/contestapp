import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import SubHeader from "./SubHeader";
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

  useEffect(() => {
    getClients()
  }, [])

  return (
    <>
    <div className="admin-client">
      <SubHeader header1={"ADMiN"} color={"white"} imgUrl={"/images/admin.png"}/>
      <div className="client-grid">
        {clients.map(client => <ClientTag key={client._id} client={client} _id={client._id} name={client.name} commissioner={client.commissioner}/>)}
        <Link to='/createclient' className="add-client" style={{width: '145px', height: '145px', borderRadius: '50%', boxShadow: '0 0 10px #183457', display: 'grid', placeItems: 'center', color: '#1c3557', fontSize: '24px', textAlign: 'center', textDecoration: 'none'}}>
        + NEW CLiENT
        </Link>
      </div>
    </div>
    </>
  )
}

export default Admin