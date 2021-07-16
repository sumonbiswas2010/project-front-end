import React from 'react'
import './userCard.css'

const FireCard =(props) =>
{
    const data = props.data
    const userNow = props.user
    
    const Users = data.map((user) =>

    <div className="cards" key={user.id}>
        <p>ID: {user.id}</p>
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
            <p>length: {data.length}</p>
            <br></br><br></br><br></br>
            <div className="cards" className="red" key={userNow.id}>
                <p>This is The Logged in User</p>
                <p>ID: {userNow.id}</p>
                <p>User Email: {userNow.email}</p> 
                <p>Phone: {userNow.phone}</p>
            </div>
            <br></br><br></br>
            <div>{Users}</div>
        </div>

    )
}
export default FireCard;