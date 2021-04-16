import React,{useState} from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import { FaUserCircle,FaFire } from 'react-icons/fa'
import { RiAdvertisementFill,RiNotification2Fill } from 'react-icons/ri'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'; 
import logo from '../static/logo.png'
import {
  NavLink as RouteNavLink
} from "react-router-dom";

import { connect } from 'react-redux'
import * as actionTypes from '../Components/store/action'

const NavBar = (props) => {

    const [isOpen1, setIsOpen1] = useState(false);
    const toggle1 = () => setIsOpen1(!isOpen1);

    return (
        <>
         <Navbar style={{maxHeight:'80px',margin:'0px 15px',padding:'0px',display:'flex',alignItems:'center',justifyContent:'center',height:'100px'}} className="text-white" light expand="md">
        {/* <NavbarBrand>reactstrap</NavbarBrand> */}
        
          <Nav className="mr-auto" navbar>
            <NavbarBrand style={{marginTop:'-25px'}}><RouteNavLink to="dashboard"><img src={logo} alt="logo"/></RouteNavLink></NavbarBrand>
            </Nav>
             <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-white font-weight-bold p-0 mr-4">
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <RiNotification2Fill className="mr-4" color="black" size="25"/>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}><FaUserCircle color="blue" size="25"/><FiChevronDown color="black"/></div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} className="ml-2">
                    <p style={{fontSize:'14px'}} className="mb-0 text-primary">See radio administrator</p>
                    <p style={{fontSize:'14px'}} className="mb-0 text-dark">sr.sr@sr.com</p>
                  </div>
                </div>
              </DropdownToggle>
              <DropdownMenu right style={{marginTop:'-25px'}}>
                <RouteNavLink to=""><DropdownItem className="font-weight-bold">
                  Profile
                </DropdownItem></RouteNavLink>
                <RouteNavLink to="/changepassword"><DropdownItem className="font-weight-bold">
                  Change Password
                </DropdownItem></RouteNavLink>
                <RouteNavLink to=""><DropdownItem className="font-weight-bold">
                  Company Detail
                </DropdownItem></RouteNavLink>
                <RouteNavLink to="/"><DropdownItem className="font-weight-bold" style={{color:'#E1636A'}} onClick={() => props.doLogout()}>
                  Sign Out
                </DropdownItem></RouteNavLink>
                </DropdownMenu>
                </UncontrolledDropdown>
          </Navbar>

        <Navbar style={{background:'#11A1DD',padding:'0px'}} className="text-white" light expand="md">
        {/* <NavbarBrand>reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle1}/>
        <Collapse isOpen={isOpen1} navbar>
          <Nav className="mr-auto" navbar>
            <RouteNavLink activeStyle={{backgroundColor:'#086890'}} to="dashboard">
              <NavItem>
              <NavLink className="text-white font-weight-bold"><AiFillDashboard className="mb-1"/> Dashboard</NavLink>
            </NavItem>
            </RouteNavLink>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-white font-weight-bold">
                <FaFire className="mb-1"/> Campaigns
              </DropdownToggle>
              <DropdownMenu right>
                <RouteNavLink activeStyle={{backgroundColor:'#086890'}} to="/vidsproduction"><DropdownItem className="font-weight-bold">
                  Videos in Production
                </DropdownItem></RouteNavLink>
                <RouteNavLink activeStyle={{backgroundColor:'#086890'}} to=""><DropdownItem className="font-weight-bold">
                  Campaign in market
                </DropdownItem></RouteNavLink>
                <DropdownItem divider />
                <RouteNavLink activeStyle={{backgroundColor:'#086890'}} to="/campaigndetails"><DropdownItem className="font-weight-bold">
                  Completed Campaigns
                </DropdownItem></RouteNavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <RouteNavLink activeStyle={{backgroundColor:'#086890'}} to="/advertisers">
              <NavItem>
              <NavLink className="text-white font-weight-bold"><RiAdvertisementFill className="mb-1"/> Advertisers</NavLink>
            </NavItem></RouteNavLink>
          </Nav>
          <Nav>
           <RouteNavLink activeStyle={{backgroundColor:'#086890'}} exact to="/addorder">
             <NavItem className="navbar-right">
              <NavLink className="text-white font-weight-bold">+Orders</NavLink>
            </NavItem>
            </RouteNavLink>
          </Nav>
          
        </Collapse>
      </Navbar>
      </>
    )
}


const mapDispatchToProps = dispatch =>
{
    return{
      doLogout : () => dispatch(actionTypes.doLogout()),
    }
}

export default connect(null,mapDispatchToProps)(NavBar)
