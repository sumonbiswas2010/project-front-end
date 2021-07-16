import React, {useState} from 'react'
import './getService.css'
import Loading from '../Component/Loading'
import UserCard from '../Component/userCard';
import GetServiceForm from '../Component/getServiceForm'
import GetServiceData from '../Component/getServiceData'

const GetService = () => {
    const [data, setData] = useState();

    const [user, setUser] = useState();

    const assignData = (x)=>{
        setData(x)
    }
    const assignUser = (x)=>{
        setUser(x)
    }
    console.log(user+data)
    return(
        <React.Fragment>
            <p>GET SERVICES</p>
            {!data &&<GetServiceForm assignUser={assignUser} assignData={assignData} />}
            {user && data && <GetServiceData user={user} data={data}/>}
        </React.Fragment>
        
    )
}

export default GetService