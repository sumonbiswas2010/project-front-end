import React, {useState, useEffect} from 'react';
import './DemoLogin.css'
import Services from './services'
import Loading from '../Component/Loading'
//import Login from '../Component/Sdata/Login'
import {facebookProvider, googleProvider} from '../config/authMethods'
import socialMediaAuth from '../config/auth'


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
    const [data, setData] = useState();
    const [img, setImg] = useState();
    const[type, setType] = useState();
    let token = localStorage.getItem("token")
    const loginCheck = async () => {
        setIsLoading(true);
        console.log("called");
        try{
        const response = await fetch('https://sumon-backend.herokuapp.com/api/userlogincheck' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const responseData = await response.json();
        if(response.ok) {
            setLoggedIn(true)
            setData(responseData.user.user.name)
        }
        else {
            setLoggedIn(false)
            console.log("Token Error")
        }
        }
        catch {
            console.log("Catch")
        }
        setIsLoading(false)
    };
    function App() {
        useEffect(() => {
            if(token){
                loginCheck()
            }
            
        }, []);
    } 
    App();
    const signUpHandler = async e => {
        setIsLoading(true)
        e.preventDefault();

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
        console.log(e)
        if(e) {e.preventDefault()}

        try{

        const response = await fetch('https://sumon-backend.herokuapp.com/api/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                type: type
            })
            
        });
        const responseData = await response.json();
        if(response.ok) {
            setLoggedIn(true)
            setData(responseData.name)
        }
        else {setMsg("Wrong Credentials")}
        setIsLoading(false)
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

    const handleOnClick = async (provider)=>{
        const res = await socialMediaAuth(provider)
        if(res.uid){
        setIsLoading(true)

        try{

        const response = await fetch('https://sumon-backend.herokuapp.com/api/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: res.email,
                password: "password",
                type: "social"
            })
            
        });
        const responseData = await response.json();
        if(response.ok) {
            setLoggedIn(true)
            setData(responseData.name)
        }
        else {setMsg("You are not Registered!!")}
        setIsLoading(false)
        localStorage.setItem("name", JSON.stringify(responseData.session))
        localStorage.setItem("token", JSON.stringify(responseData.jsontoken))
        
    }
    catch {
        setIsLoading(false)
    }

        }
        else{setMsg("User not found")}
    }
    return(
        <React.Fragment>
            {isLoading && <Loading/>}
            {!isLoading && !loggedIn && 
            <div>
            <br></br>
            <p>Social Login</p>
            <button onClick={()=>handleOnClick(facebookProvider)}>Facebook</button>
            <button onClick={()=>handleOnClick(googleProvider)}>Google</button>
            <br></br> 
            </div>}
            {!isLoading && loggedIn && <Services data={data}/>}
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
            <input name="phone" value={phone} onChange={phoneChange} type="phone" required></input>
            <br></br><br></br>
            <label>District: </label>
            <input name="district" value={district} onChange={districtChange} type="text" required></input>
            <br></br>
        </div>}
        <div>
        <br></br>
      <label>Email: </label>
      <input name="email" onChange={handleEmailChange} type="email" required></input>
      <br></br><br></br>
      <label>Password: </label>
      <input onChange={handlePasswordChange} name="password" type="password" required></input>
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