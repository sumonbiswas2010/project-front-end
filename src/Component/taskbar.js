import React, {useState, useEffect} from 'react'
import './taskbar.css'
import { Redirect  } from 'react-router-dom';

const Taskbar = () => {

    const [loggedIn, setIsLoggedIn] = useState();
    
    let token;
    
    function App() {
        useEffect(() => {
            token = localStorage.getItem("token")
            if (!token) {
                setIsLoggedIn(false)
            }
            else {
                setIsLoggedIn(true)
            }
        }, []);
    } 
    App();
    const logout = (e) => {
        if(loggedIn)
        {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        console.log("called")
        return (
            <Redirect to="users"/>
        )
        
        }
        
    }

    return(
        <div className="taskbar">
            <a href="/demo" onClick={logout}>{loggedIn? 'Logout': 'Login'}</a>
            {loggedIn &&<a href="/profile">My Profile</a>}
            <a href="admin">Admins</a>
            <a href="/myservices">My Services</a>
            <a href="/police_stations">Police Stations</a>
            <a href="/fire_services">Fire Services</a>
            <a href="/get_service">Get Services</a>
            
        </div>
    )
}

export default Taskbar