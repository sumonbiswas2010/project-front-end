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
    const [signUpMode, setSignUpMode] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [msg, setMsg] = useState();
    const [isLoading, setIsLoading] = useState();
    const [phone, setPhone] = useState();


    const signUpHandler = async e => {
        setIsLoading(true)
        e.preventDefault();
        console.log("called signup");
        try{
        const response = await fetch('https://sumon-backend.herokuapp.com/api/' , {
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
        const response = await fetch('https://sumon-backend.herokuapp.com/api/login' , {
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
    console.log("token"+localStorage.getItem("token"))

    return(
        <React.Fragment>
                {isLoading && <Loading/>}
                {(localStorage.getItem("token")|| loggedIn) && <Services/>}
                {!isLoading && !loggedIn && 
                
        <div className="container">
                {signUpMode && 
                
                    <div className="field">
                        <input name="first_name" value={firstName} onChange={firstNameChange} type="text" placeholder="First name"></input><br/>
                        
                        <input name="last_name" value={lastName} onChange={lastNameChange} type="text" placeholder="Last name"></input><br/>
                    
                        <input name="phone" value={phone} onChange={phoneChange} type="phone" placeholder="Phone no."></input><br/>

                        <input name="district" value={district} onChange={districtChange} type="text" placeholder="District"></input><br/>
                    </div>}
                    <div className="field">
                        <input name="email" value={email} onChange={handleEmailChange} type="email" placeholder="Email"></input><br/>
                
                        <input value={password} onChange={handlePasswordChange} name="password" type="password" placeholder="Password"></input>
                        
                        <div className="clearfix">
                        <button className="signup" onClick={modeToggle}>{signUpMode? 'Login' : 'Sign Up'}</button>
                        <button className="subbtn"onClick={signUpMode? signUpHandler : loginHandler } type="submit">Submit</button>
                </div>   
         <p className="red center">{msg}</p>
      </div>
    </div>
    
            }
            
    </React.Fragment>
    )
}

export default DemoLogin;