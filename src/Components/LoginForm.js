import { Button,Form,FormGroup,Label,Input,FormFeedback } from 'reactstrap';
import logo from '../static/logo.png'
import { FaEyeSlash,FaEye } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { checkEmail ,checkFormValid} from './Validations/validations';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actionTypes from '../Components/store/action'
import axios from 'axios';
import { doLogin } from '../api/Api';

const LoginForm = (props) => {

    useEffect(() => {document.body.style = 'background: #F2F5F9;';},[])


    const [loginDetails,setLoginDetails] = useState({
        email:'',
        password:''
    })

    const [errorMsgs,setErrorMsgs] = useState({ //Error Messages for form inputs
        emailError:'',
        passwordError:'',
    })

    const [showPass,setShowPass] = useState(false);

    const checkLogin = (email,password) => 
    {
        const payload = {email:email,password:password};
        doLogin(payload)
        .then( res => {
            props.setLogin(true);
            console.log(res);
            props.setUser(email,res.token,res.personData);
            localStorage.setItem('token',res.token);
            localStorage.setItem('currUser',JSON.stringify(res.personData));
        })
        .catch( err => { 
            alert(err);
            setLoginDetails({email:'',password:''});
            document.getElementById("passwordid").value = "";
         })
    }

    const handleSubmit = e =>
    {
        e.preventDefault();
        if(checkFormValid(errorMsgs))
        {
            checkLogin(loginDetails.email,loginDetails.password);
        }
        else
        {
            alert("Form contains one or more Errors")
        }
    }

    const handleChange = e =>
    {
        switch(e.target.name)
        {
            case 'emailnm':

                setLoginDetails({...loginDetails,email:e.target.value}); //Enter Data in state
                if(checkEmail(e.target.value)){ //Check and Enter Error in Errors State
                    setErrorMsgs({...errorMsgs,emailError:''})
                }
                else{ setErrorMsgs({...errorMsgs,emailError:'Invalid Email'}) }
                break;

            case 'passwordnm':
                setLoginDetails({...loginDetails,password:e.target.value}); //Enter Data in state

                if(e.target.value){ //Check and Enter Error in Errors State
                    setErrorMsgs({...errorMsgs,passwordError:''})
                }
                else{ setErrorMsgs({...errorMsgs,passwordError:'Password Required'}) }
                break;

            default:
                throw new Error("Shouldn't Come here");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 flex-column mx-0 px-3" style={{background:`#F2F5F9`}}>
            <div className="w-100 mt-100 mx-auto" style={{maxWidth:'500px',maxHeight:'500px',marginTop:'15vh'}}>
                <div className="text-center mb-3">
                    <img alt="logo" src={logo}></img>
                </div>
                <div className="bg-white shadow p-4" style={{borderRadius:'20px'}}>
                    <Form onSubmit={handleSubmit} className="w-100">
                    
                    <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                        <Label for="emailid"><strong>Email <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                        <Input value={loginDetails.email} invalid={errorMsgs.emailError.length>1} onChange={handleChange} name="emailnm" className="border-top-0 border-right-0 border-left-0" type="email" id="emailid" placeholder="Enter Email" />
                        <FormFeedback>{errorMsgs.emailError}</FormFeedback>
                    </FormGroup>
                    
                    <FormGroup className={"text-black fw-700 fs-14 mb-4"} style={{position:'relative'}}>
                        <Label for="passwordid"><strong>Password <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                        {showPass 
                        ? <> 
                            <Input value={loginDetails.password} invalid={errorMsgs.passwordError.length>1} onChange={handleChange} name="passwordnm" className="border-top-0 border-right-0 border-left-0"  type="text" id="passwordid" placeholder="Enter Password"/>
                            <FormFeedback>{errorMsgs.passwordError}</FormFeedback>
                         </>
                        : <> 
                            <Input invalid={errorMsgs.passwordError.length>1} onChange={handleChange} name="passwordnm" className="border-top-0 border-right-0 border-left-0" type="password" id="passwordid" placeholder="Enter Password"/> 
                            <FormFeedback>{errorMsgs.passwordError}</FormFeedback>
                         </>}
                        {showPass && !errorMsgs.passwordError ? <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEye onClick={() => setShowPass(!showPass)}/></div> : !errorMsgs.passwordError && <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEyeSlash onClick={() => setShowPass(!showPass)}/></div>}
                    </FormGroup>
                    
                    <FormGroup>
                        <Button type="submit" color={"primary"} className="w-100"><strong>LOGIN</strong></Button>
                    </FormGroup>
                    
                </Form>
                
                <div className="d-flex justify-content-center align-items-center">
                <Button color="link" className=""><strong>Forgot Password?</strong></Button> </div>          
            </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
