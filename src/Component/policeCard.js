import React from 'react'
import './userCard.css'

const PoliceCard =(props) =>
{
    const data = props.data
    
    const Users = data.map((user) =>

    <div className="cards" key={user.id}>
        <p>ID: <a target="_blank" href={"/police_stations/"+user.id}>{user.id}</a></p>
        <p>Email: {user.email}</p> 
        <p>Phone: {user.phone}</p>
        <p>LAT: {user.lat}</p>
        <p>LNG: {user.lng}</p>
        <p>Address: {user.address}, {user.thana}, {user.district}</p>
        <p>Added By: {user.addedBy}</p>
    </div>
    
    );


    return(
        <div>
            <br></br><br></br>
            <div>{Users}</div>
        </div>

    )
}
export default PoliceCard;