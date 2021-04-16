import React, { useState } from 'react'
import { useEffect } from 'react';
import { Row,Col,Form,FormGroup,Input,Label, Container, Button,FormFeedback } from 'reactstrap';
import { addCampaign, addClient, getAdvertisers, getMarkets } from '../../api/Api';
import { checkFormValid, checkNumeric, checkWebsiteURL, getToDateInddmmyyyy } from '../Validations/validations';
import Loader from "react-loader-spinner";

const AddOrder = ({addOrderDetails,setAddOrderDetails,addOrdererrorMsgs,setAddOrderErrorMsgs,setStepNo,handleCancel,addAdvertiserResp,addAssetsPayload,setAddAssetsPayload}) => {

    useEffect(() => {document.body.style = 'background: #F2F5F9;';})
    const [advertiserOptions,setAdvertiserOptions] = useState([]);
    const [targetMarketOptions,setTargetMarketOptions] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getMarkets().then(markets => setTargetMarketOptions(markets))
    },[])

    useEffect(() => {
        getAdvertisers().then(advertisers => setAdvertiserOptions(advertisers))
    },[])

    const handleBack = () =>
    {
        setStepNo(1)
    }

    const handleSubmit = e =>
    {
        e.preventDefault();
        setLoading(true);
        if(checkFormValid(addOrdererrorMsgs))
        {
            let payload = {
                "clientCompanyID": addOrderDetails.advertiser,
                "title": addOrderDetails.title,
                "description": addOrderDetails.description,
                "landingpageURL": addOrderDetails.landingURL,
                "targetMarket": addOrderDetails.targetMarket,
                "distributionBudget": addOrderDetails.budget,
                "startDate": getToDateInddmmyyyy(),
                "price": addOrderDetails.price,
                "soaID": addOrderDetails.soaID,
                "sosID": addOrderDetails.sosID,
                "salesOrgCompanyID": addOrderDetails.salesOrgCompanyID,
                "statusByPersonID": addOrderDetails.sosID,
                "statusWithPersonID": addOrderDetails.statusWithPersonID
            }
            console.log(addOrderDetails);
            addCampaign(payload)
            .then(res => {
                console.log(res);
                setAddOrderDetails({...addOrderDetails,resp:res});
                setAddAssetsPayload({...addAssetsPayload,campaignID:res.history.campaignID,clientID:addOrderDetails.advertiser,uploadedBy:res.newCampaign.sosID})
                setLoading(false);
                setStepNo(3);
            })
            .catch(err => alert(err))
            
        }
        else
        {
            alert("Form contains one or more Errors")
            setLoading(false);
        }
    }

    const handleChange = e =>
    {
        switch(e.target.name)
        {
            case 'advertiser':

                setAddOrderDetails({...addOrderDetails,advertiser:e.target.value}); //Enter Data in state
                break;

            case 'title':

                setAddOrderDetails({...addOrderDetails,title:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddOrderErrorMsgs({...addOrdererrorMsgs,titleError:''})
                }
                else{ setAddOrderErrorMsgs({...addOrdererrorMsgs,titleError:'Title is Required'}) }
                break;

            case 'landingURL':

                setAddOrderDetails({...addOrderDetails,landingURL:e.target.value}); //Enter Data in state
                if( checkWebsiteURL(e.target.value) ){ //Check and Enter Error in Errors State
                    setAddOrderErrorMsgs({...addOrdererrorMsgs,landingURLError:''})
                }
                else{ setAddOrderErrorMsgs({...addOrdererrorMsgs,landingURLError:'Enter Valid URL'}) }
                break;

            case 'price':

                setAddOrderDetails({...addOrderDetails,price:e.target.value}); //Enter Data in state
                if( checkNumeric(e.target.value) ){ //Check and Enter Error in Errors State
                    setAddOrderErrorMsgs({...addOrdererrorMsgs,priceError:''})
                }
                else{ setAddOrderErrorMsgs({...addOrdererrorMsgs,priceError:'Enter Valid Price'}) }
                break;

            case 'description':
                
                setAddOrderDetails({...addOrderDetails,description:e.target.value}); //Enter Data in state
                if(e.target.value){ //Check and Enter Error in Errors State
                    setAddOrderErrorMsgs({...addOrdererrorMsgs,descriptionError:''})
                }
                else{ setAddOrderErrorMsgs({...addOrdererrorMsgs,descriptionError:'Description is Required'}) }
                break;

            case 'targetMarket':

                setAddOrderDetails({...addOrderDetails,targetMarket:e.target.value}); //Enter Data in state
                break;

            case 'budget':
                
                setAddOrderDetails({...addOrderDetails,budget:e.target.value}); //Enter Data in state
                if( checkNumeric(e.target.value) ){ //Check and Enter Error in Errors State
                    setAddOrderErrorMsgs({...addOrdererrorMsgs,budgetError:''})
                }
                else{ setAddOrderErrorMsgs({...addOrdererrorMsgs,budgetError:'Enter Valid Budget'}) }
                break;

            default:
                throw new Error("Shouldn't Come here");
        }
    }

    const actualForm = (<div className="w-100" style={{height:'100vh'}} >
            <div className="container">
            <Row color="primary" className="mt-5 mb-2 text-primary font-weight-bold ml-4"><h5>Add New Orders</h5></Row>
            <Row className="bg-white shadow p-3 rounded-30 mx-auto">
                <Container fluid>
                <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Order</div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {/* Advertiser */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Advertiser <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.advertiser} name="advertiser" required type="select">
                                        {advertiserOptions && advertiserOptions.map(advertiser => <option key={advertiser.id} value={advertiser.id}>{advertiser.companyName}</option>)}
                                    </Input>
                                    <FormFeedback>{addOrdererrorMsgs.advertiserError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Title */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Title <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.title} name="title" required invalid={addOrdererrorMsgs.titleError.length>1} type="text" id="companyNameid" placeholder="Title" />
                                    <FormFeedback>{addOrdererrorMsgs.titleError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* Landing Page URL */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Preffered Landing Page URL <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.landingURL} name="landingURL" required invalid={addOrdererrorMsgs.landingURLError.length>1} type="text" id="companyNameid" placeholder="www.testbacancy.com" />
                                    <FormFeedback>{addOrdererrorMsgs.landingURLError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Price */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Price <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.price} name="price" required invalid={addOrdererrorMsgs.priceError.length>1} type="text" id="companyNameid" placeholder="Price" />
                                    <FormFeedback>{addOrdererrorMsgs.priceError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                {/* Description */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Description <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                <Input onChange={handleChange} value={addOrderDetails.description} name="description" required invalid={addOrdererrorMsgs.descriptionError.length>1} type="textarea" id="exampleText" /></FormGroup>
                                <FormFeedback>{addOrdererrorMsgs.descriptionError}</FormFeedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Distribution</div>
                            </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {/* Target Market */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyWebid"><strong>Target Market <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.targetMarket} name="targetMarket" type="select" required>
                                        {targetMarketOptions && targetMarketOptions.map(market => <option key={market.id} value={market.id}>{market.name}</option>)}
                                    </Input>
                                    <FormFeedback>{addOrdererrorMsgs.targetMarketError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                {/* Budget */}
                                <FormGroup className={"text-black fw-700 fs-14 mb-4"}>
                                <Label for="companyNameid"><strong>Budget <span style={{color:'red',fontSize:'17px'}}><sup>*</sup></span></strong></Label>
                                    <Input onChange={handleChange} value={addOrderDetails.budget} name="budget" required invalid={addOrdererrorMsgs.budgetError.length>1} type="text" id="companyNameid" placeholder="$0" />
                                    <FormFeedback>{addOrdererrorMsgs.budgetError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}><Button onClick={handleBack} color="primary">Back</Button></Col>
                            <Col md={7}></Col>
                            <Col md={1}><Button onClick={handleCancel} color="white" className="border">Cancel</Button></Col>
                            <Col md={2}><Button color="primary">Create Order</Button></Col>      
                        </Row>            
                </Form>
                </Container>
            </Row>
            </div>
        </div>)

    return (
        <>
        {
            loading ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                />
            </div> : actualForm
        }
        </>      
    )
}

export default AddOrder
