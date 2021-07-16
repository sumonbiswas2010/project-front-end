import React, {useState} from 'react';
import './DemoLogin.css'
import Services from './services'
import Loading from '../Component/Loading'
//import Login from '../Component/Sdata/Login'


const DemoLogin = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [district, setDistrict] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState();
    const [signUpMode, setSignUpMode] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [msg, setMsg] = useState();
    const [isLoading, setIsLoading] = useState();
    const [phone, setPhone] = useState();
    
    var session = localStorage.getItem("name");

    const signUpHandler = async e => {
        setIsLoading(true)
        e.preventDefault();
        console.log("called signup");
        try{
        const response = await fetch('/' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                password: password,
                district
            })
            
        });
        //const resposneData = await response.json();
        console.log(response)
        if(response.ok) {setSignUpMode(false); setMsg("Signp Successfull. Please Login")}
        else if (response.status===400) {setMsg("Email already exists")}
        else if (response.status===401) {setMsg("Phone already exists")}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }
    }
    const loginHandler = async e => {
        setIsLoading(true)
        e.preventDefault();
        console.log(email + password)
        console.log("called");
        try{
        const response = await fetch('/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
            
        });
        const responseData = await response.json();
        console.log("name: " +responseData.session.username)
        setUserName(responseData.name)
        if(response.ok) {setLoggedIn(true)}
        else {setMsg("Wrong Credentials")}
        setIsLoading(false)
        console.log("s: "+ responseData)
        localStorage.setItem("name", JSON.stringify(responseData.session))
        localStorage.setItem("token", JSON.stringify(responseData.jsontoken))
        
    }
    catch {
        setIsLoading(false)
    }
    if(loggedIn)
    {
        console.log("logged")
    }
    
    };
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }
    const firstNameChange = e =>{
        setFirstName(e.target.value);
    }
    const lastNameChange = e =>{
        setLastName(e.target.value);
    }
    const phoneChange =  e =>{
        setPhone(e.target.value);
    }
    const districtChange =  e =>{
        setDistrict(e.target.value);
    }
    const modeToggle = () => {
        setSignUpMode(!signUpMode)
    }
    
    //session= JSON.stringify(session)
    //console.log("s: "+session)
    //console.log(loggedIn)
    const [x, setx] = useState(true);
    if(session && x)
    {
        console.log("ok")
        setLoggedIn(true);
        setUserName(session);
        setx(false);
        //localStorage.removeItem("name");
    }
    return(
        <React.Fragment>
            {isLoading && <Loading/>}
            {loggedIn && <Services username={userName}/>}
            {!isLoading && !loggedIn && 
            
        <div className="App">
            <br></br> <br></br> <br></br><br></br>
            <button onClick={modeToggle}>{signUpMode? 'Login' : 'Sign Up'}</button>
        <br></br>
        <br></br><br></br>
        {signUpMode && 
        <div>
            <label>First Name: </label>
            <input name="first_name" value={firstName} onChange={firstNameChange} type="text"></input>
            <br></br>
            <br></br>
            <label>Last Name: </label>
            <input name="last_name" value={lastName} onChange={lastNameChange} type="text"></input>
            <br></br>
            <br></br>
            <label>Phone: </label>
            <input name="phone" value={phone} onChange={phoneChange} type="phone"></input>
            <br></br><br></br>
            <label>District: </label>
            <input name="district" value={district} onChange={districtChange} type="text"></input>
            <br></br>
        </div>}
        <div>
        <br></br>
      <label>Email: </label>
      <input name="email" value={email} onChange={handleEmailChange} type="email"></input>
      <br></br><br></br>
      <label>Password: </label>
      <input value={password} onChange={handlePasswordChange} name="password" type="password"></input>
      <br></br><br></br>
      <button className="center"onClick={signUpMode? signUpHandler : loginHandler } type="submit">Submit</button>
      <br></br> <br></br> <br></br>
      <p className="red center">{msg}</p>
      </div>
    </div>
    
            }
            
    
    </React.Fragment>
    )
}

export default DemoLogin;