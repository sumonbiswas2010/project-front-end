import React, {useState, useEffect} from 'react';
import Loading from '../Component/Loading'
import FireCard from '../Component/fireCard';
import './users.css'
import fire from '../images/fire.jpg';
import './fireServices.css'



const FireServices = (props) => {

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
    
    // if(loggedIn){
    //     getUsers();
    // }


    

    return(
        <React.Fragment>
            {isLoading && <Loading/>}
            {!loggedIn && <p>Please log in to view</p>}
            {!isLoading &&
            <div>
                
            <div className="">
            {allUsers &&
            <div>
            <FireCard data = {allUsers} user = {currentUser}/>
            </div>}
            <div className="col-lg-6 order-1 order-lg-2">
                  <img src={fire} class="fire " alt="Responsive image"></img>
                </div>
            </div>
            </div>
           
            }
        </React.Fragment>
    )
}

export default FireServices;