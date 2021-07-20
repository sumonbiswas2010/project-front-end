import React, {useState, useEffect} from 'react'
import './taskbar.css'
//import {Route, Redirect  } from 'react-router-dom';

const AdminTaskbar = (props) => {

    const [loggedIn, setIsLoggedIn] = useState();
    
    let token = localStorage.getItem("adminToken")
    
    function App() {
        useEffect(() => {
            if (props.login || token) {
                setIsLoggedIn(true)
            }
            else {
                setIsLoggedIn(false)
            }
        }, []);
    } 
    App();
    const logout = (e) => {
        e.preventDefault();
        if(loggedIn)
        {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminName")
        console.log("called")
        }
        
    }

    return(
        <div className="taskbar">
            <a href="/" onClick={logout}>{loggedIn? 'Logout': 'Login'}</a>
            <a href="admin">Admins</a>
            <a href="/users">Users</a>
            <a href="/police_stations">Police Stations</a>
            <a href="/fire_services">Fire Services</a>
            <a href="/get_service">Get Services</a>
            
        </div>
    )
}

export default AdminTaskbar