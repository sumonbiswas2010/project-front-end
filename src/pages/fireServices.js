import React, {useState} from 'react';
import Loading from '../Component/Loading'
import FireCard from '../Component/fireCard';
import './users.css'



const FireServices = () => {

    const [allUsers, setUsers] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState();
    const [loggedIn, setLoggedin]= useState(false);
    
    let token = localStorage.getItem("token")
    const name = localStorage.getItem("name")


    const getUsers = async () => {
        setIsLoading(true);
        //console.log("called");
        try{
        const response = await fetch('https://helping-backend.vercel.app/api/fire' , {
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
    //getUsers();
    console.log(currentUser)

    

    return(
        <React.Fragment>
            {isLoading && <Loading/>}
            {!loggedIn && <p>Please log in to view</p>}
            {!isLoading &&
            <div className="container">
            <p>{name}</p>
            <button onClick={getUsers}>GetUSers</button>
            {allUsers &&
            <div>
            <br></br>
            <FireCard data = {allUsers} user = {currentUser}/>
            </div>}
            </div>
            }
        </React.Fragment>
    )
}

export default FireServices;