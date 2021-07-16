import React, {useState} from 'react'
import './adminLogin.css'
import Loading from './Loading'

const AdminLogin = (props) => {

    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [isLoading, setIsLoading] = useState();
    const [loggedIn, setLoggedIn] = useState();
    const [userName, setUserName] = useState();
    const [type, setType] = useState("police");

    const [msg, setMsg] = useState();


    
    const loginHandler = async e => {
        setIsLoading(true)
        e.preventDefault();
        console.log("called");
        try{
        const response = await fetch('/admin' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type, username:userName, password, password2
            })
            
        });
        const responseData = await response.json();

        if(response.ok) {
            setLoggedIn(true) //not working!!!
            props.login(true, type)
            //console.log("login: "+ loggedIn)
            
        }
        else {setMsg("Wrong Credentials")}
        setIsLoading(false)
        console.log("s: "+ responseData)
        //localStorage.setItem("adminName", JSON.stringify(responseData.session))
        localStorage.setItem("adminToken", JSON.stringify(responseData.jsontoken))
        
    }
    catch {
        setIsLoading(false)
    }
    
}

    

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }
    const handlePasswordChange2 = e => {
        setPassword2(e.target.value);
    }
    const usernameChange =  e => {
        setUserName(e.target.value);
    }

    const serviceSet = e => {
        setType(e.target.value);
    }


    return(
        <React.Fragment>
            {isLoading && <Loading/>}

            {!isLoading && !loggedIn && 
            
        <div className="App">
            <br></br> <br></br>
            
        <br></br>
        

        <div>
        <label>Service Type: </label>
            <select name="serviceType" value={type} onChange={serviceSet}>
                <option value="police">Police Station</option>
                <option value="fire">Fire Service</option>
                <option value="others">Others</option>
            </select>
        <br></br>
      <label>Username: </label>
      <input name="username" value={userName} onChange={usernameChange} type="email"></input>
      <br></br><br></br>
      <label>Password: </label>
      <input value={password} onChange={handlePasswordChange} name="password" type="password"></input>
      <br></br><br></br>
      <label>Password2: </label>
      <input value={password2} onChange={handlePasswordChange2} name="password" type="password"></input>
      <br></br><br></br>
      <button className="center"onClick={loginHandler} type="submit">Submit</button>
      <br></br> <br></br> <br></br>
      <p className="red center">{msg}</p>
      </div>
    </div>
    
            }
            
    
    </React.Fragment>
    )
}


export default AdminLogin
