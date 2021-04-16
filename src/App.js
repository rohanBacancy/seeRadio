import RootStepper from './Components/Add Order/RootStepper';
import CampaignDetails from './Components/CampaignDetails/CampaignDetails';
import ChangePassword from './Components/ChangePassword';
import LoginForm from './Components/LoginForm';
import NavBar from './Components/NavBar';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import VideosInProduction from './Components/VideosInProduction/VideosInProduction';
import * as actionTypes from './Components/store/action'
import { useEffect } from 'react';

function App(props) {

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      props.setLogin(true);
      const currUser = JSON.parse(localStorage.getItem('currUser'));
      props.setUser(currUser.emai,localStorage.getItem('token'),currUser);
    }
  },[])

  return (
    <>
    {props.loggedIn ? <NavBar/> : <LoginForm/>}

      <Route path="/login" exact component={LoginForm}/>

      {/* If logged in then setup below routes */}
      {props.loggedIn && <><Route path="/changepassword" exact component={ChangePassword}/> 
        <Route path="/addorder" exact render={(props) => <RootStepper {...props}/>}/>
        <Route path="/campaigndetails/:id" render={(props) => <CampaignDetails {...props}/>}/>
        <Route path="/vidsproduction" exact component={VideosInProduction}/>
        </> }

    </>
  );
}

const mapStateToProps = state =>
{
    return{
      loggedIn : state.loggedIn,
      currEmail : state.currEmail,
      token : state.token,
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
      setLogin : (boolIS) => dispatch(actionTypes.setLogin(boolIS)),
      setUser : (email,token,personalDetails) => dispatch(actionTypes.setUser(email,token,personalDetails)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);