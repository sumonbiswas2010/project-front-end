import React from 'react'
import './userCard.css'

const UserCard =(props) =>
{
    const data = props.data
    const userNow = props.user
    
    const Users = data.map((user) =>

    <div className="cards" key={user.id}>
        <p>ID: {user.id}</p>
        <p>Full Name: {user.first_name} {user.last_name}</p>
        <p>User Email: {user.email}</p> 
        <p>Phone: {user.phone}</p>
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
export default UserCard;