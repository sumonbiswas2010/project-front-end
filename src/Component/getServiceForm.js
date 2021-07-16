import React, {useState} from 'react'
import './getServiceForm.css'
import Loading from './Loading'


const GetServiceForm = (props) =>{
    
    const [serviceType, setServiceType] = useState("police");
    const[location, setLocation] = useState("Registered Location");
    const [msg, setMsg] = useState();
    const [isLoading, setIsLoading] = useState();
    let token = localStorage.getItem("token")

    console.log(msg)


    const locationSetHandler= (e) =>{
        const val = e.target.value
        setLocation(val)
        const element= document.getElementById('color');
        if(val=='others')
            element.style.display='block';
        else  
            element.style.display='none';
        }

        const serviceSet= (e) => {
            setServiceType(e.target.value)
        }


        const getServiceNow = async (e) => {
            console.log(location, serviceType)
            setIsLoading(true)
            e.preventDefault();
            console.log("called signup");
            try{
                const response = await fetch('/help' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    location, type:serviceType
                })
            
            });
            const responseData = await response.json();

            if(response.ok) { 
                
                setMsg("Data Found Successfully")
                props.assignUser(responseData.user)
                props.assignData(responseData.data)
                
            }
            else if (response.status===400) {setMsg("Service Type Error")}
            else if (response.status===400) {setMsg("Database error")}
            else {setMsg("Something Bad, Contact Developers");}
            setIsLoading(false)
 
        
        }
            catch {
                setIsLoading(false)
            }
        }
        const locationSet = (e) => {
            setLocation(e.target.value)
        }
        
    
    return(
        <React.Fragment>
        {isLoading && <Loading/>}
        {!isLoading &&
        <div id="serviceForm">
            <p>Form</p>

            <label>Service Type: </label>
            <select name="serviceType" onChange={serviceSet}>
                <option value="police">Police Station</option>
                <option value="fire">Fire Service</option>
                <option value="others">Others</option>
            </select>
            <br></br>
            <br></br>
            <label>Location</label>

            <select name="location" onChange={locationSetHandler} >
                <option value="Registered Location">Registered Location</option>
                <option value="others">Others</option>
            </select>
            <input type="text" name="location" onChange={locationSet} placeholder="others" id="color"></input>
            <br></br><br></br>
            <button type="submit" onClick={getServiceNow}>Get Help Now</button>

        </div>
        }
        </React.Fragment>
        
    )
}

export default GetServiceForm