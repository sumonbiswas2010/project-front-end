import React, {useState, useEffect} from 'react'
import './adminTaskbar.css'
import { Navbar, Nav, } from 'react-bootstrap';
const AdminTaskbar = (props) => {

    const [loggedIn, setLoggedIn] = useState();
    const adminToken=localStorage.getItem("adminToken")
    const adminName=localStorage.getItem("adminName")

    function App() {
        useEffect(() => {
            if(adminToken) {
                setLoggedIn(true)
            }
            else{
                setLoggedIn(false)
            }
            if(props.login){
                setLoggedIn(props.login)
            }
        }, []);
    } 
    App();

    // const loginChange = (x)=>{
    //     setLoggedIn(x)
    // }

    



    const logout = (e) => {
        console.log("logout hoye gelam...")
        e.preventDefault();
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
            <div className="navbar2">
            <Navbar bg="danger" text="light" expand="lg" >
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link className="ad" href="/admin" onClick={loggedIn? logout: null }>{loggedIn? 'Logout': 'Login'}</Nav.Link>
                    <Nav.Link className="ad" href="admin">Admins</Nav.Link>
                    <Nav.Link className="ad" href="/users">User</Nav.Link>
                    <Nav.Link className="ad" href="/police_stations">Police Stations</Nav.Link>
                    <Nav.Link className="ad" href="/fire_services">Fire Services</Nav.Link>
                    <Nav.Link className="ad" href="/get_service">Get Services</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        </React.Fragment>
    )
}

export default AdminTaskbar