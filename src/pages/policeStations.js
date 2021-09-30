import React, {useState, useEffect} from 'react';
import Loading from '../Component/Loading'
import PoliceCard from '../Component/policeCard';
import './users.css'
import './policeStations.css'
import police from "../images/police.jpg";



const PoliceStations = (props) => {

    const [allUsers, setUsers] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState();
    const [loggedIn, setLoggedin]= useState();
    
    let token = localStorage.getItem("token")
    const name = localStorage.getItem("name")

    console.log(props.login + "oj")
    function App() {
        useEffect(() => {
            if(props.login){
                setLoggedin(true);
                getUsers()
            }
            else{setLoggedin(false);}
        }, [props.login]);
      } 
    App();


    const getUsers = async () => {
        setIsLoading(true);
        //console.log("called");
        try{
        const response = await fetch('https://helping-backend.vercel.app/api/police' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        const responseData = await response.json();
        console.log(responseData)
        if(response.ok) {
            setLoggedin(true)
            setUsers(responseData.data)
            //console.log(allUsers)
            setCurrentUser(responseData.user.user)
            
        }
        else {
            console.log("Error")
        }
          
        }
        catch {
            console.log("Catch")
        }
        setIsLoading(false)
        
        
    };
    
    // if(loggedIn){
    //     getUsers();
    // }


    

    return(
        <React.Fragment>
            {isLoading && <Loading/>}
            {!loggedIn && <p>Please log in to view</p>}
            {!isLoading &&

            <div >
                 
            <div className="">
               
            {allUsers &&
            <div>
            <PoliceCard data = {allUsers} user = {currentUser}/>
            </div>}
            <img src={police} class="police " alt=""/>
            </div>
            </div>
            }
        </React.Fragment>
    )
}

export default PoliceStations;