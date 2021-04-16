import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Form,FormGroup,Input,Label, Container, Button,FormFeedback } from 'reactstrap';
import { addClient, getCountries, getIndustries, getState } from '../../api/Api';
import { checkEmail, checkFormValid, checkPhone, checkPostal, checkWebsiteURL, formatPhoneNumber } from '../Validations/validations';
import Loader from "react-loader-spinner";


const AddAdvertiser = ({addAdvertiserDetails,setAddAdvertiserDetails,addAdvertisererrorMsg,setAddAdvertiserErrorMsgs,setStepNo,handleCancel,token,personalDetails,addOrderDetails,setAddOrderDetails}) => {

    const [countryFlag,setCountryFlag] = useState(false);
    const [stateFlag,setStateFlag] = useState(false);
    const [countryOptions,setCountryOptions] = useState([]);
    const [industryOptions,setIndustryOptions] = useState([]);
    const [stateOptions,setStateOptions] = useState([]);
    const [bilStateOptions,setBilStateOptions] = useState([]);
    const [loading,setLoading] = useState(false);
 
    useEffect(() => {document.body.style = 'background: #F2F5F9;';})

    //Put data in Industry Dropdown via API
    useEffect(() => getIndustries().then(industries => setIndustryOptions(industries) ) , [])

    //Put data in Country via API
    useEffect(() => {
        if(!countryFlag){ //If Countries aren't set
            getCountries().then(countries => {
                setCountryOptions(countries);
                setCountryFlag(true); //Doesn't Recall Get Countries
            })
        } 
    }, [countryFlag])

    //Put data in State after Country is set via API
    useEffect(() => {
        if(countryFlag && addAdvertiserDetails.country){ //If Countries aren't set
            getState(addAdvertiserDetails.country).then(states => {
                setStateOptions(states)
                setStateFlag(true);
            })
        } 
        if(countryFlag && addAdvertiserDetails.billingCountry)
        {
            getState(addAdvertiserDetails.billingCountry).then(states => {
                setBilStateOptions(states)
            })
        }
    }, [addAdvertiserDetails.country,addAdvertiserDetails.billingCountry,countryFlag])


    const handleSubmit = e =>
    {
        e.preventDefault();
        setLoading(true);
        if(checkFormValid(addAdvertisererrorMsg))
        {
            let payload = {
                "companyName": addAdvertiserDetails.companyName,
                "industryID": addAdvertiserDetails.individualCategory,
                "companyWebsite": addAdvertiserDetails.companyWebsite,
                "companyType": "Client",
                "contactAddress": {
                    "business": {
                        "address": addAdvertiserDetails.address,
                        "address2": addAdvertiserDetails.address2,
                        "city": addAdvertiserDetails.city,
                        "postal": addAdvertiserDetails.postalCode,
                        "country": addAdvertiserDetails.country,
                        "state": addAdvertiserDetails.state,
                        "provinceID": 2
                    },
                    "useSame": false
                },
                "addressType": "Billing",
                "firstName": addAdvertiserDetails.firstName,
                "lastName": addAdvertiserDetails.lastName,
                "email": addAdvertiserDetails.email,
                "phone": addAdvertiserDetails.phone,
                "roleCode": "CLIENT",
                "createdByPerson": personalDetails.id
            }

            if(addAdvertiserDetails.secContactTgl) //If secondary contact added then only push the object in payload
            {
                payload["secondaryContact"] = {
                    "firstName": addAdvertiserDetails.secFirstName,
                    "lastName": addAdvertiserDetails.secLastName,
                    "email": addAdvertiserDetails.secEmail,
                    "phone": addAdvertiserDetails.secPhone
                }
            }
            //If billing contact added then only push the object in payload
            
            payload["contactAddress"]["billing"] = {
                        "address": addAdvertiserDetails.billingAddress || addAdvertiserDetails.address,
                        "address2": addAdvertiserDetails.billingAddress2 || addAdvertiserDetails.address2,
                        "city": addAdvertiserDetails.billingCity || addAdvertiserDetails.city,
                        "state": addAdvertiserDetails.billingState || addAdvertiserDetails.state,
                        "postal": addAdvertiserDetails.billingPostalCode || addAdvertiserDetails.postalCode,
                        "country": addAdvertiserDetails.billingCountry || addAdvertiserDetails.country,
                        "provinceID": 2
            }
            
            
            addClient(payload)
            .then(res => {
                setAddAdvertiserDetails({...addAdvertiserDetails,resp:res});
                setAddOrderDetails({...addOrderDetails,advertiser:res.salesOrgCompany.id,landingURL:addAdvertiserDetails.companyWebsite,soaID:res.soaData.id,sosID:personalDetails.id,salesOrgCompanyID:res.salesOrgCompany.parentSalesOrgCompanyID,statusWithPersonID:res.salesOrgCompany.clientPersonID,statusByPersonID:personalDetails.id})
                setLoading(false);
                console.log(res);
                setStepNo(2);
            })
            .catch(err => {
                alert(err);
                setLoading(false);
            })
            
        }
        else
        {
            setLoading(false);
            alert("Form contains one or more Errors")
        }
    }

    const handleChange = e =>
    {
        switch(e.target.name)
        {
            case 'companyName':

                setAddAdvertiserDetails({...addAdvertiserDetails,companyName:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,companyNameError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,companyNameError:'Company Name Required'}) }
                break;

            case 'companyWeb':
                
                setAddAdvertiserDetails({...addAdvertiserDetails,companyWebsite:e.target.value}); //Enter Data in state
                if(checkWebsiteURL(e.target.value)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,companyWebsiteError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,companyWebsiteError:'Incorrect URL'}) }
                break;

            case 'individualCategory':  

                setAddAdvertiserDetails({...addAdvertiserDetails,individualCategory:e.target.value}); //Enter Data in state
                break;

            case 'firstName':

                setAddAdvertiserDetails({...addAdvertiserDetails,firstName:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,firstNameError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,firstNameError:'First Name Required'}) }
                break;

            case 'lastName':

                setAddAdvertiserDetails({...addAdvertiserDetails,lastName:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,lastNameError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,lastNameError:'Last Name Required'}) }
                break;

            case 'email':
                                
                setAddAdvertiserDetails({...addAdvertiserDetails,email:e.target.value}); //Enter Data in state
                if(checkEmail(e.target.value)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,emailError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,emailError:'Enter Valid Email'}) }
                break;

            case 'phone':
                                                
                setAddAdvertiserDetails({...addAdvertiserDetails,phone:formatPhoneNumber(e.target.value)}); //Enter Data in state
                if(checkPhone(e.target.value)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,phoneError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,phoneError:'Enter Valid PhoneNo'}) }
                break;

            case 'secCheck':

                if(!e.target.checked)
                {
                    setAddAdvertiserDetails({
                        ...addAdvertiserDetails,
                        secFirstName:'',
                        secLastName:'',
                        secEmail:'',
                        secPhone:'',
                        secContactTgl:e.target.checked,
                    });
                    setAddAdvertiserErrorMsgs({
                        ...addAdvertisererrorMsg,
                        secFirstNameError:'',
                        secLastNameError:'',
                        secEmailError:'',
                        secPhoneError:'',
                    });
                }
                else
                {
                setAddAdvertiserDetails({...addAdvertiserDetails,secContactTgl:e.target.checked});
                }
                break;

            case 'secFirstName':

                setAddAdvertiserDetails({...addAdvertiserDetails,secFirstName:e.target.value}); //Enter Data in state
                break;

            case 'secLastName':

                setAddAdvertiserDetails({...addAdvertiserDetails,secLastName:e.target.value}); //Enter Data in state
                break;

            case 'secEmail':
                                
                setAddAdvertiserDetails({...addAdvertiserDetails,secEmail:e.target.value}); //Enter Data in state
                if(checkEmail(e.target.value)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,secEmailError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,secEmailError:'Enter Valid Email'}) }
                break;

            case 'secPhone':
                                                
                setAddAdvertiserDetails({...addAdvertiserDetails,secPhone:e.target.value}); //Enter Data in state
                if(checkPhone(e.target.value)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,secPhoneError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,secPhoneError:'Enter Valid PhoneNo'}) }
                break;

            case 'address':

                setAddAdvertiserDetails({...addAdvertiserDetails,address:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,addressError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,addressError:'Address is Required'}) }
                break;

            case 'address2':
                
                setAddAdvertiserDetails({...addAdvertiserDetails,address2:e.target.value}); //Enter Data in state
                break;

            case 'city':

                setAddAdvertiserDetails({...addAdvertiserDetails,city:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,cityError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,cityError:'City Name Required'}) }
                break;

            case 'country':
                                
                setAddAdvertiserDetails({...addAdvertiserDetails,country:e.target.value}); //Enter Data in state
                break;

            case 'state':
                setAddAdvertiserDetails({...addAdvertiserDetails,state:e.target.value}); //Enter Data in state
                break;

            case 'postal':
                                                                
                setAddAdvertiserDetails({...addAdvertiserDetails,postalCode:e.target.value}); //Enter Data in state
                if(checkPostal(e.target.value,addAdvertiserDetails.country)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,postalCodeError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,postalCodeError:'Enter Valid PostalCode'}) }
                break;

            case 'billingTgl':

                if(!e.target.checked)
                {
                    setAddAdvertiserDetails({
                        ...addAdvertiserDetails,
                        billingAddress:'',
                        billingAddress2:'',
                        billingCity:'',
                        billingCountry:'',
                        billingState:'',
                        billingPostalCode:'',
                        billingTgl:e.target.checked,
                    });
                    setAddAdvertiserErrorMsgs({
                        ...addAdvertisererrorMsg,
                        billingAddressError:'',
                        billingAddress2Error:'',
                        billingCityError:'',
                        billingCountryError:'',
                        billingStateError:'',
                        billingPostalCodeError:'',
                    });
                }
                else
                {
                setAddAdvertiserDetails({...addAdvertiserDetails,billingTgl:e.target.checked});
                }
                break;

            case 'billingAddress':

                setAddAdvertiserDetails({...addAdvertiserDetails,billingAddress:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingAddressError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingAddressError:'Address is Required'}) }
                break;

            case 'billingAddress2':
                
                setAddAdvertiserDetails({...addAdvertiserDetails,billingAddress2:e.target.value}); //Enter Data in state
                break;

            case 'billingCity':

                setAddAdvertiserDetails({...addAdvertiserDetails,billingCity:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingCityError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingCityError:'City Name Required'}) }
                break;

            case 'billingCountry':
                                
                setAddAdvertiserDetails({...addAdvertiserDetails,billingCountry:e.target.value}); //Enter Data in state
                break;

            case 'billingState':
                                
                setAddAdvertiserDetails({...addAdvertiserDetails,billingState:e.target.value}); //Enter Data in state
                break;

            case 'billingPostalCode':
                                                                
                setAddAdvertiserDetails({...addAdvertiserDetails,billingPostalCode:e.target.value}); //Enter Data in state
                if(checkPostal(e.target.value,addAdvertiserDetails.billingCountry)){ //Check and Enter Error in Errors State
                    setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingPostalCodeError:''})
                }
                else{ setAddAdvertiserErrorMsgs({...addAdvertisererrorMsg,billingPostalCodeError:'Enter Valid PostalCode'}) }
                break;

            default:
                throw new Error("Shouldn't Come here");
        }
    }

    const secondaryFrm = (<>
            <Row className="mt-3">
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Secondary Contact</div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {/* Comapny Name */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>First Name </strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.secFirstNameError.length>1} value={addAdvertiserDetails.secFirstName} type="text" required name="secFirstName" id="companyNameid" placeholder="First Name" />
                                    <FormFeedback>{addAdvertisererrorMsg.secFirstNameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Company Website */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Last Name </strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.secLastNameError.length>1} value={addAdvertiserDetails.secLastName} type="text" required name="secLastName" id="companyWebid" placeholder="Last Name" />
                                    <FormFeedback>{addAdvertisererrorMsg.secLastNameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* Email */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Email </strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.secEmailError.length>1} value={addAdvertiserDetails.secEmail} type="email" required name="secEmail" id="companyWebid" placeholder="Enter Email" />
                                    <FormFeedback>{addAdvertisererrorMsg.secEmailError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Phone */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Phone </strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.secPhoneError.length>1} value={addAdvertiserDetails.secPhone} type="text" required name="secPhone" id="companyWebid" placeholder="Enter Contact Number" />
                                    <FormFeedback>{addAdvertisererrorMsg.secPhoneError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
    </>)

    const billingFrm = (<>
            <Row className="mt-3">
                            <Col md={6}>
                                {/* Address */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Address<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.billingAddressError.length>1} value={addAdvertiserDetails.billingAddress} type="text" required name="billingAddress" id="companyWebid" placeholder="Enter Address" />
                                    <FormFeedback>{addAdvertisererrorMsg.billingAddressError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Address line 2 */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Address line 2</strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.billingAddress2} type="text" name="billingAddress2" id="companyWebid" placeholder="Enter Address" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* City */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>City<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.billingCityError.length>1} value={addAdvertiserDetails.billingCity} type="text" required name="billingCity" id="companyWebid" placeholder="Enter City" />
                                    <FormFeedback>{addAdvertisererrorMsg.billingCityError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Country */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Country <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.billingCountry} type="select" name="billingCountry">
                                        {countryOptions && 
                                            countryOptions.map( country => <option key={country.code} value={country.code}>{country.name}</option> )
                                        }                               
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* State/Province */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>State/Province <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.billingState} type="select" name="billingState">
                                        {bilStateOptions && 
                                            bilStateOptions.map( state => <option key={state.code} value={state.code}>{state.name}</option> )
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Postal Code */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Postal Code<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.billingPostalCodeError.length>1} value={addAdvertiserDetails.billingPostalCode} type="text" required name="billingPostalCode" id="companyWebid" placeholder="Enter Postal Code" />
                                    <FormFeedback>{addAdvertisererrorMsg.billingPostalCodeError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
    </>)

    const actualForm = (<div className="w-100" style={{height:'100vh'}} >
            <div className="container">
            <Row color="primary" className="mt-5 mb-2 text-primary font-weight-bold ml-4"><h5>Add New Advertiser</h5></Row>
            <Row className="bg-white shadow p-3 rounded-30 mx-auto">
                <Container fluid>
                <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                {/* Company Name */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Comapny Name <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input invalid={addAdvertisererrorMsg.companyNameError.length>1} value={addAdvertiserDetails.companyName} onChange={handleChange} type="text" required name="companyName" id="companyNameid" placeholder="Company Name" />
                                    <FormFeedback>{addAdvertisererrorMsg.companyNameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Company Website Address */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Comapny Website Address <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.companyWebsiteError.length>1} value={addAdvertiserDetails.companyWebsite} type="text" required name="companyWeb" id="companyWebid" placeholder="eg. www.abc.com" />
                                    <FormFeedback>{addAdvertisererrorMsg.companyWebsiteError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* Individual Category */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Individual Category <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.individualCategory} name="individualCategory" type="select" id="industryCategory">
                                        {industryOptions && 
                                            industryOptions.map( industry => <option key={industry.id} value={industry.id}>{industry.name}</option> )
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Primary Contact</div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {/* First Name */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>First Name <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.firstNameError.length>1} value={addAdvertiserDetails.firstName} type="text" required name="firstName" id="companyNameid" placeholder="First Name" />
                                    <FormFeedback>{addAdvertisererrorMsg.firstNameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Last Name */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Last Name <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.lastNameError.length>1} value={addAdvertiserDetails.lastName} type="text" required name="lastName" id="companyWebid" placeholder="Last Name" />
                                    <FormFeedback>{addAdvertisererrorMsg.lastNameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* Email */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Email <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.emailError.length>1} value={addAdvertiserDetails.email} type="email" required name="email" id="companyWebid" placeholder="Enter Email" />
                                    <FormFeedback>{addAdvertisererrorMsg.emailError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Phone */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Phone <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.phoneError.length>1} value={addAdvertiserDetails.phone} type="text" required name="phone" id="companyWebid" placeholder="Enter Contact Number" />
                                    <FormFeedback>{addAdvertisererrorMsg.phoneError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                {/* Secondary contact toggle CheckBox */}
                                <FormGroup check className="ml-2 mt-auto mb-auto">
                                    <Input onChange={handleChange} checked={addAdvertiserDetails.secContactTgl} type="checkbox" name="secCheck" id="exampleCheck"/>
                                    <Label for="exampleCheck" check>Secondary Contact (Billing-Optional)</Label>
                                </FormGroup>
                            </div>
                            </Col>
                        </Row>

                        {/* Secondary billing form     */}
                        {addAdvertiserDetails.secContactTgl ? secondaryFrm : null}

                        {/* Secondary billing form     */}

                        <Row className="mt-3">
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Business Address</div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {/* Address */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Address<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.addressError.length>1} value={addAdvertiserDetails.address} type="text" required name="address" id="companyWebid" placeholder="Enter Address" />
                                    <FormFeedback>{addAdvertisererrorMsg.addressError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Address line 2 */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Address line 2</strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.address2} type="text" name="address2" id="companyWebid" placeholder="Enter Address" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* City */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>City<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.cityError.length>1} value={addAdvertiserDetails.city} type="text" required name="city" id="companyWebid" placeholder="Enter City" />
                                    <FormFeedback>{addAdvertisererrorMsg.cityError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Country */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Country <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addAdvertiserDetails.country} type="select" name="country" id="country">
                                        {countryOptions && 
                                            countryOptions.map( country => <option key={country.code} value={country.code}>{country.name}</option> )
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* State/Province */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>State/Province <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input disabled={!stateFlag} onChange={handleChange} value={addAdvertiserDetails.state} type="select" name="state" id="state">
                                        {stateOptions && 
                                            stateOptions.map( state => <option key={state.code} value={state.code}>{state.name}</option> )
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Postal Code */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                    <Label for="companyWebid"><strong>Postal Code<span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} invalid={addAdvertisererrorMsg.postalCodeError.length>1} value={addAdvertiserDetails.postalCode} type="text" required name="postal" id="companyWebid" placeholder="Enter Postal Code" />
                                    <FormFeedback>{addAdvertisererrorMsg.postalCodeError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {/* Billing Address Optional toggle checkbox */}
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <FormGroup check className="ml-2  mt-auto mb-auto">
                                    <Input onChange={handleChange} checked={addAdvertiserDetails.billingTgl} type="checkbox" name="billingTgl" id="exampleCheck"/>
                                    <Label for="exampleCheck" check>Billing Address Optional</Label>
                                </FormGroup>
                            </div>
                            </Col>    
                        </Row>  

                        {addAdvertiserDetails.billingTgl ? billingFrm : null}


                        <Row className="mt-3">
                            <Col md={8}></Col>
                            <Col md={1}><Button onClick={handleCancel} color="white" className="border">Cancel</Button></Col>
                            <Col></Col>
                            <Col md={2}><Button type="submit" color="primary">Create Advertiser</Button></Col>
                        </Row>
                </Form>
                </Container>
            </Row>
            </div>
        </div>)

    return (
        <>
           {loading ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                />
            </div>
            :
            actualForm 
            }
      </>
    )
}

const mapStateToProps = state =>
{
    return{
      token : state.token,
      personalDetails : state.personalDetails
    }
}

export default  connect(mapStateToProps)(AddAdvertiser)
