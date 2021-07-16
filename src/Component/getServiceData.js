import React from 'react'
import './getServiceData.css'

const GetServiceData = (props) =>{
    const data = props.data
    const user = props.user
    
    const Users = data.map((data) =>

    <div className="cards" key={data.id}>
        <button onClick={console.log(data.id)}>Click to Get HELP</button>
        <p>ID: {data.id}</p>
        <p>Full address: {data.address}, {data.thana}, {data.district}</p>
        <p>Email: {data.email}</p> 
        <p>Phone: {data.phone}</p>
        <p>Added By: {data.addedBy}</p>
    </div>
    
    );


    return(
        <div>
            <p>length: {data.length}</p>
            <br></br><br></br><br></br>
            <div className="cards" className="red" key={user.id}>
                <p>This is The Logged in User</p>
                <p>ID: {user.id}</p>
                <p>User Email: {user.email}</p> 
                <p>Phone: {user.phone}</p>
            </div>
            <br></br><br></br>
            <div>{Users}</div>
        </div>

    )
}

export default GetServiceData