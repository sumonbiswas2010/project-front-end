import React, {useState, useEffect} from 'react'
import './admins.css'
import AdminLogin from '../Component/adminLogin'
import AddService from '../Component/addService'
import AdminTaskbar from '../Component/adminTaskbar'

const Admins = () => {

    const [loggedIn, setLoggedIn] = useState();
    const [type, setType] = useState();
    
    let token = localStorage.getItem("adminToken");
    const loginChange = (status, type) => {
        setLoggedIn(status)
        setType(type)
        console.log("status: "+status+ type)
    }
    function App() {
        useEffect(() => {
            if (!token) {
                setLoggedIn(false)
            }
            else {
                setLoggedIn(true)
            }
        }, []);
    } 
    App();
    

    return (
        <div>
        <p>Admins Activity</p>
        <AdminTaskbar login={loggedIn} />
        {loggedIn && <p>Logged In</p>}
        {!loggedIn &&<AdminLogin login={loginChange}/>}
        {loggedIn && <AddService type={type}/>}
        

        </div>
    )
}

export default Admins