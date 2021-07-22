import React, {useState} from 'react'
import './taskbar.css'
const AdminTaskbar = (props) => {

    const [loggedIn, setLoggedIn] = useState();

    const logout = (e) => {
        //e.preventDefault();
        if(loggedIn)
        {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminName")
        setLoggedIn(false)
        console.log("called")
        props.loginChange(false)
        
        
        }
        
    }

    return(
        <React.Fragment>
            
        <div className="taskbar">
            <a href="/admin" onClick={logout}>{loggedIn? 'Logout': 'Login'}</a>
            <a href="admin">Admins</a>
            <a href="/users">Users</a>
            <a href="/police_stations">Police Stations</a>
            <a href="/fire_services">Fire Services</a>
            <a href="/get_service">Get Services</a>
            
        </div>
        </React.Fragment>
    )
}

export default AdminTaskbar