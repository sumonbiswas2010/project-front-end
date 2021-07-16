import React from 'react';
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
import NotFound from './pages/notFound'
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';



const App = () => {
  return (
    <React.Fragment>
    <Taskbar/>
    <Router>
      <Switch>
      <Route path="/users" exact>
        <Users/>
      </Route>
      <Route path="/admin" exact>
        <Admins/>
      </Route>
      <Route path="/get_service" exact>
        <GetService/>
      </Route>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/police_stations" exact>
        <PoliceStations/>
      </Route>
      <Route path="/fire_services" exact>
        <FireServices/>
      </Route>
      <Route path="/services" exact>
        <Services/>
      </Route>
      
      <Route path="/demo" exact>
        <DemoLogin/>
      </Route>
      <Route path="/signup" exact>
        <Signup/>
      </Route>
      <Route path="/">
        <NotFound/>
      </Route>
      </Switch>
      </Router>
      
      </React.Fragment>
  );
}

export default App;
