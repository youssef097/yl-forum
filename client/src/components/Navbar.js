import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Notifications from "./Notifications"
import { deleteToken } from '../auth'
export default function Navbar(props) {
  const [user, setUser] = useState(props.user)
  const [options, setOptions] = useState(false)

  useEffect(() => {
    setUser(props.user)
  }, [props])

  function handleLogout() {
    deleteToken()
    props.updateUser()
  }
  

  return (
    <nav className="shadow">
      <div className="navbar-left ">
        <Link to="/home"> <h1>Welcome </h1></Link>
        {user&&<Link to="/explore"><i class="fas fa-compass"></i> Explore</Link>}
        {user&&<Notifications/> }
        
      </div>

      {/* <div class="navbar-search">
        <input type="text"/>
        <button><i class="fas fa-search"></i></button>
      </div> */}

      {/* <Notifications/> */}
      {!user?<Link to="/login"><button onClick={() => handleLogout()}>Login</button></Link>:
      <div className="dropdown" onClick={() => { setOptions(!options) }} >
        <div className="user-dropdown" style={{height:"100%"}}>
          <img className="avatar" height="100%" src={user?.profile ? "/api/uploads/"+user.profile : "/api/img/default-profile-picture1.jpg"} className="profile-image" alt="" />
          {user.name}
        </div>

        <i class="fas fa-caret-square-down"></i>
        {options && user && <ul className="dropdown-menu" >
          <li>
            <Link to="/my-profile"><button> <i class="fas fa-user"></i> <span>My Profile</span> </button></Link> 
          </li>
          <li>
            <Link to="/home"><button onClick={() => handleLogout()}> <i class="fas fa-cog"></i> <span>Settings</span> </button></Link> 
          </li>
          <li>
            <Link to="/home"><button onClick={() => handleLogout()}> <i class="fas fa-sign-out-alt"></i> <span>Logout</span></button></Link> 
          </li>
          
          </ul>}
      </div>
      }
    </nav>

  )
}
