import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import './addService.css'

const AddService = (props) => {

    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState();
    const [msg, setMsg] = useState();
    const [phone, setPhone] = useState();
    const [phone_extra, setPhone_extra] = useState();
    const [district, setDistrict] = useState();
    const [thana, setThana] = useState();
    const [address, setAddress] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();
    
    let insertId;
    let token = localStorage.getItem("adminToken")

    const signUpHandler = async e => {
        setIsLoading(true)
        e.preventDefault();
        console.log("called signup");
        try{
        const response = await fetch('https://sumon-backend.herokuapp.com/api/add_service' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              type:props.type, district, thana, address, phone, phone_extra, lat, lng, password,email
            })
            
        });
        const responseData = await response.json();
        insertId = responseData.data.insertId
        if(response.ok) {
             setMsg("Data Inserted at ID: " + insertId)}
        else if (response.status===405) {setMsg("Required Data Error")}
        else if (response.status===500) {setMsg("Database Error")}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }
    }
    
    const districtChange = e => {
        setDistrict(e.target.value);
    }

    const thanaChange = e => {
        setThana(e.target.value);
    }

    const addressChange = e => {
        setAddress(e.target.value);
    }
    
    const latChange = e => {
        setLat(e.target.value);
    }

    const lngChnage = e => {
        setLng(e.target.value)
    }

    const emailChnage = e => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }
    const phoneChange =  e =>{
        setPhone(e.target.value);
    }

    const phoneChange2 =  e =>{
        setPhone_extra(e.target.value);
    }

    const OneTimeChange = () =>{
        useEffect(()=>{
            console.log('called')
            if(props.type == 'fire'){
                setType('Fire Staton')
            }
            else if(props.type == 'police'){
                setType('Police Staton')
            }
        }, [props.type])
    }
    
    OneTimeChange();
    console.log(type)

    return(
    <div>
        {isLoading && <Loading/>}
        {!isLoading &&
        
        <div>
            <p>You can add a {type}</p>
        <p>Add a Service</p>
        <br></br>
            <label>District: </label>
            <input name="district" value={district} onChange={districtChange} type="text"></input>
            <br></br>
            <br></br>
            <label>Thana: </label>
            <input name="thana" value={thana} onChange={thanaChange} type="text"></input>
            <br></br><br></br>
            <label>Address: </label>
            <input name="address" value={address} onChange={addressChange} type="text"></input>
            <br></br><br></br>
            <label>E-Mail: </label>
            <input name="email" value={email} onChange={emailChnage} type="email"></input>
            <br></br><br></br>
            <label>Phone: </label>
            <input name="phone" value={phone} onChange={phoneChange} type="phone"></input>
            <br></br><br></br>
            <label>Phone Extra: </label>
            <input name="phone_extra" value={phone_extra} onChange={phoneChange2} type="phone"></input>
            <br></br><br></br>
            <label>LAT: </label>
            <input name="lat" value={lat} onChange={latChange} type="number"></input>
            <br></br><br></br>
            <label>LNG: </label>
            <input name="lng" value={lng} onChange={lngChnage} type="numner"></input>
            <br></br><br></br>
            <label>Password: </label>
            <input value={password} onChange={handlePasswordChange} name="password" type="password"></input>
            <br></br><br></br>
            <button className="center"onClick={signUpHandler } type="submit">Submit</button>
            <br></br> <br></br> <br></br>
            <p className="red center">{msg}</p>
        </div>  
            }
    </div>
    )
}

export default AddService