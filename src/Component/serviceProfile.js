import React from 'react'
import './serviceProfile.css'

const ServiceProfile = (props) => {
    const data = props.data
    console.log(data)

    return(
        
        <div key={data.id}>
            <p>OK</p>
            <br></br>
            <p>ID: {data.id}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Phone Extra: {data.phone_extra}</p>
            <p>Address: {data.address}</p> 
            <p>Thana: {data.thana}</p>    
            <p>District: {data.district}</p>   
            <p>LAT: {data.lat}</p> 
            <p>LNG: {data.lng}</p> 
            <p>Added By: {data.addedBy}</p>
            
        </div>
    )

}

export default ServiceProfile