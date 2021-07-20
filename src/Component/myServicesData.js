import React from 'react'
import './userCard.css'

const MyServicesData =(props) =>
{
    const data = props.data
    console.log("data",data)
    
    const Users = data.map((user) =>

    <div className="cards" key={user.id}>
        <p>Service ID: <a target="_blank" href={"/fire_services/"+user.serviceid}>{user.serviceid}</a></p> 
        <p>Status: {user.status}</p>
        <p>Creation Time: {user.creation_time}</p>
    </div>
    
    );


    return(
        <div>
            <br></br><br></br>
            <div>{Users}</div>
        </div>

    )
}
export default MyServicesData;