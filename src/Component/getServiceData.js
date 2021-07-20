import React, {useState} from 'react'
import './getServiceData.css'
import Loading from './Loading'

const GetServiceData = (props) =>{

    const [isLoading, setIsLoading] = useState();
    const [msg, setMsg] = useState();
    const data = props.data
    const user = props.user
    const type= props.type
    const token = localStorage.getItem("token")
    const [createdServiceId, setCreatedServiceId] = useState();

    const createService = async (serviceId) => {
        setIsLoading(true)

        try{
        const response = await fetch('https://sumon-backend.herokuapp.com/api/service' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                type, serviceId
            })
            
        });
        const responseData = await response.json();
        if(response.ok) {
            setCreatedServiceId(responseData.data);
            setMsg("Signp Successfull. Please Login")}
        else if (response.status===405) {setMsg("Required Data Error")}
        else if (response.status===500) {setMsg("Database Error")}
        else {setMsg("Something Bad, Contact Developers");}
        setIsLoading(false)
        
    }
    catch {
        setIsLoading(false)
    }
    }

    
    const Users = data.map((data) =>

    <div className="cards" key={data.id}>
        <button className="center" onClick={()=>createService(data.id)}>Click to Get HELP</button>
        <br></br><br></br>
        <p>ID: {data.id}</p>
        <p>Full address: {data.address}, {data.thana}, {data.district}</p>
        <p>Email: {data.email}</p> 
        <p>Phone: {data.phone}</p>
        <p>Added By: {data.addedBy}</p>
    </div>
    
    );


    return(
        <React.Fragment>

        {isLoading && <Loading/>}
        
        {!isLoading &&
        <div>
            <br></br><br></br>
            {!isLoading && createdServiceId && <p className="center">Service Creation ID: {createdServiceId}</p>}
            <br></br><br></br>
            <div>{Users}</div>
        </div>}
        </React.Fragment>
        
        

    )
}

export default GetServiceData