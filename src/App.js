import React, {useState, useEffect} from 'react';
import Home from './pages/home'
import Services from './pages/services';
import Signup from './pages/signup';
//import AddServices from './pages/addServices'
import DemoLogin from './pages/DemoLogin'
import Users from './pages/users'
import Taskbar from './Component/taskbar'
import PoliceStations from './pages/policeStations'
import FireServices from './pages/fireServices'
import GetService from './pages/getService'
import Admins from './pages/admins'
import Profile from './pages/profile'
import NotFound from './pages/notFound'
import Details from './pages/details'
import SocialLogin from './pages/socialLogin'
import MyServices from './pages/myServices';
import Loading from './Component/Loading'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';



const App = () => {

  const [loggedIn, setLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState();
  const loginStatus = (x) => {
    setLoggedIn(x);
  }
  const token= localStorage.getItem("token")
  const loginCheck = async () => {
    setIsLoading(true);
    console.log("called");
    try{
    const response = await fetch('https://helping-backend-older.vercel.app/api/userlogincheck' , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    const responseData = await response.json();
    if(response.ok) {
        setLoggedIn(true)

    }
    else {
        setLoggedIn(false)
        console.log("Token Error")
    }
    }
    catch {
        console.log("Catch")
    }
    setIsLoading(false)
};
function App() {
    useEffect(() => {
        if(token){
            loginCheck()
        }
        
    }, []);
} 
App();
  
  
  return (
    <React.Fragment>
    
    <Router>
      <Switch>
      <Route path="/loading" exact>
      <Loading/>
      </Route>
      <Route path="/social" exact>
      <Taskbar/>
        <SocialLogin/>
      </Route>
      <Route path="/users" exact>
      <Taskbar/>
        <Users/>
      </Route>
      <Route path="/profile" exact>
      <Taskbar/>
        <Profile/>
      </Route>
      <Route path="/admin" exact>
        
        <Admins/>
      </Route>
      <Route path="/myservices" exact>
      <Taskbar/>
        <MyServices login={loggedIn}/>
      </Route>
      <Route path="/get_service" exact>
      <Taskbar/>
        <GetService/>
      </Route>
      <Route path="/" exact>
      <Taskbar/>
        <Home/>
      </Route>
      <Route path="/police_stations" exact>
      <Taskbar/>
        <PoliceStations login={loggedIn}/>
      </Route>
      <Route path="/police_stations/:id" exact>
      <Taskbar/>
        <Details type="police"/>
      </Route>
      <Route path="/fire_services/:id" exact>
      <Taskbar/>
        <Details type="fire"/>
      </Route>
      <Route path="/fire_services" exact>
      <Taskbar/>
        <FireServices login={loggedIn}/>
      </Route>
      <Route path="/services" exact>
        <Services/>
      </Route>
      
      <Route path="/demo" exact>
        <DemoLogin loginStatus={loginStatus}/>
      </Route>
      <Route path="/signup" exact>
        <Signup/>
      </Route>
      <Route path="/">
      <Taskbar/>
        <NotFound/>
      </Route>
      </Switch>
      </Router>
      
      </React.Fragment>
  );
}

export default App;
