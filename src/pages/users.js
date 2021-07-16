import React, {useState} from 'react';
import Loading from '../Component/Loading'
import UserCard from '../Component/userCard';
import './users.css'



const Users = () => {

    const [allUsers, setUsers] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [exists, setExists] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const [loggedIn, setLoggedin]= useState(false);

    let token = localStorage.getItem("token")
    const name = localStorage.getItem("name")


    const getUsers = async () => {
        setIsLoading(true);
        //console.log("called");
        try{
        const response = await fetch('/' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response)
        
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
            console.log("oops")
        }
        setIsLoading(false)
        
        
    };
    //getUsers();
    //console.log(currentUser)

    

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
            <UserCard data = {allUsers} user = {currentUser}/>
            </div>}
            </div>
            }
        </React.Fragment>
    )
}

export default Users;
