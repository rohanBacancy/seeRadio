import React from 'react'
import { Button,Form,FormGroup,Label,Input,FormFeedback } from 'reactstrap';
import { FaEyeSlash,FaEye } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { checkFormValid, checkPassRePass } from './Validations/validations'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../Components/store/action'

const ChangePassword = (props) => {

    useEffect(() => {document.body.style = 'background: #F2F5F9;';})

    const [formDetails,setFormDetails] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
    })

    const [errorMsgs,setErrorMsgs] = useState({ //Error Messages for form inputs
        oldPasswordError:'',
        newPasswordError:'',
        confirmPasswordError:'',
    })

    const [showPassCur,setShowPassCur] = useState(false);
    const [showPassNew,setShowPassNew] = useState(false);
    const [showPassConfirm,setShowPassConfirm] = useState(false);

    const handleSubmit = e =>
    {
        e.preventDefault();
        if(checkFormValid(errorMsgs))
        {
            axios.post("http://localhost:3000/api/person/changePassword",
            {"oldPassword":formDetails.oldPassword,"newPassword":formDetails.newPassword}
            ,{headers: {
                'x-token': props.token
            }})
            .then(res => {props.setToken(res.data.data.token); alert("Password Changed Successfully")})
            .catch(err => alert(JSON.parse(err.request.response).errorMessage))
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
            case 'oldPassword':

                setFormDetails({...formDetails,oldPassword:e.target.value}) //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setErrorMsgs({...errorMsgs,oldPasswordError:''})
                }
                else{ setErrorMsgs({...errorMsgs,oldPasswordError:'Password is required'}) }
                break;

            case 'newPassword':
                setFormDetails({...formDetails,newPassword:e.target.value}) //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setErrorMsgs({...errorMsgs,newPasswordError:''})
                }
                else{ setErrorMsgs({...errorMsgs,newPasswordError:'New Password is required'}) }
                break;
            case 'confirmPassword':
                setFormDetails({...formDetails,confirmPassword:e.target.value}) //Enter Data in state
                if( checkPassRePass(formDetails.newPassword,e.target.value) ){
                    setErrorMsgs({...errorMsgs,confirmPasswordError:''})
                }
                else{ setErrorMsgs({...errorMsgs,confirmPasswordError:'New Password Must match the Confirm Password'}) }
                break;
            default:
                throw new Error("Shouldn't Come here");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 flex-column mx-0 px-3" style={{background:`#F2F5F9`}}>
            <div className="w-100 mt-100 mx-auto" style={{maxWidth:'500px',maxHeight:'500px',marginTop:'6vh'}}>
                
                <div className="bg-white shadow p-4" style={{borderRadius:'20px'}}>
                    <Form onSubmit={handleSubmit} className="w-100">
                    
                    <FormGroup className={"text-black fw-700 fs-14 mb-4"} style={{position:'relative'}}>
                        <Label for="curpassword"><strong>Current Password <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                        {showPassCur 
                        ? <>
                            <Input required invalid={errorMsgs.oldPasswordError.length>1} onChange={handleChange} className="border-top-0 border-right-0 border-left-0"  type="text" name="oldPassword" id="curpassword" placeholder="Enter Password"/>
                            <FormFeedback>{errorMsgs.oldPasswordError}</FormFeedback> 
                        </> 
                        : <> 
                            <Input required invalid={errorMsgs.oldPasswordError.length>1} onChange={handleChange} className="border-top-0 border-right-0 border-left-0"  type="password" name="oldPassword" id="curpassword" placeholder="Enter Password"/>
                            <FormFeedback>{errorMsgs.oldPasswordError}</FormFeedback> 
                        </>}
                        {showPassCur && !errorMsgs.oldPasswordError ? <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEye onClick={() => setShowPassCur(!showPassCur)}/></div> : !errorMsgs.oldPasswordError && <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEyeSlash onClick={() => setShowPassCur(!showPassCur)}/></div>}
                    </FormGroup>

                    <FormGroup className={"text-black fw-700 fs-14 mb-4"} style={{position:'relative'}}>
                        <Label for="newPassword"><strong>New Password <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                        {showPassNew 
                        ? <>
                            <Input required invalid={errorMsgs.newPasswordError.length>1} onChange={handleChange} className="border-top-0 border-right-0 border-left-0"  type="text" name="newPassword" id="newPassword" placeholder="Enter Password"/> 
                            <FormFeedback>{errorMsgs.newPasswordError}</FormFeedback> 
                        </>
                        : <>
                            <Input required invalid={errorMsgs.newPasswordError.length>1} onChange={handleChange}  className="border-top-0 border-right-0 border-left-0"  type="password" name="newPassword" id="newPassword" placeholder="Enter Password"/>
                            <FormFeedback>{errorMsgs.newPasswordError}</FormFeedback> 
                        </>}
                        {showPassNew && !errorMsgs.newPasswordError ? <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEye onClick={() => setShowPassNew(!showPassNew)}/></div> : !errorMsgs.newPasswordError && <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEyeSlash onClick={() => setShowPassNew(!showPassNew)}/></div>}
                    </FormGroup>

                    <FormGroup className={"text-black fw-700 fs-14 mb-4"} style={{position:'relative'}}>
                        <Label for="confirmPassword"><strong>Confirm Password <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                        {showPassConfirm 
                        ? <>
                            <Input required invalid={errorMsgs.confirmPasswordError.length>1} onChange={handleChange} className="border-top-0 border-right-0 border-left-0"  type="text" name="confirmPassword" id="confirmPassword" placeholder="Enter Password"/> 
                            <FormFeedback>{errorMsgs.confirmPasswordError}</FormFeedback> 
                         </>
                        : <>
                            <Input required invalid={errorMsgs.confirmPasswordError.length>1} onChange={handleChange} className="border-top-0 border-right-0 border-left-0"  type="password" name="confirmPassword" id="confirmPassword" placeholder="Enter Password"/> 
                            <FormFeedback>{errorMsgs.confirmPasswordError}</FormFeedback> 
                        </>}
                        {showPassConfirm && !errorMsgs.confirmPasswordError ? <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEye onClick={() => setShowPassConfirm(!showPassConfirm)}/></div> : !errorMsgs.confirmPasswordError &&  <div style={{position:'absolute',top:'35px',right:'10px'}}><FaEyeSlash onClick={() => setShowPassConfirm(!showPassConfirm)}/></div>}
                    </FormGroup>
                    
                    <FormGroup>
                        <Button type="submit" color={"primary"} className="w-100"><strong>Change Password</strong></Button>
                    </FormGroup>
                    
                </Form>
            </div>
        </div>
      </div>
    )
}

const mapStateToProps = state =>
{
    return{
      token : state.token,
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
      setToken : (token) => dispatch(actionTypes.setToken(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)
