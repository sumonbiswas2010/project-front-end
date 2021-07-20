import React from 'react'

const UserProfile = (props) => {
    const data = props.data

    return(
        <div key={data.id}>
            <br></br>
            <p>ID: {data.id}</p>
            <p>Full Name: {data.first_name} {data.last_name}</p>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Phone Extra: {data.phone_extra}</p>
            <p>Blood Group: {data.blood}</p>
            <p>Gender: {data.gender}</p>
            <p>Address: {data.address}</p> 
            <p>Thana: {data.thana}</p>    
            <p>District: {data.district}</p>    
            
               
        </div>
    )

}

export default UserProfile