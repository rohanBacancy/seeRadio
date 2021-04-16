import React,{useEffect,useState} from 'react'
import { Row,Col,Form,FormGroup,Input,Label, Container, Button, Table } from 'reactstrap';
import { GiBackwardTime } from 'react-icons/gi';
import { FaDownload } from 'react-icons/fa';
import Dropzone from 'react-dropzone'
import {FaMicrophone} from 'react-icons/fa'
import {FcDocument} from 'react-icons/fc'
import {RiCheckboxMultipleBlankLine} from 'react-icons/ri'
import { useParams } from 'react-router';
import { getCampaignDetailByID } from '../../api/Api';
import { uploadData } from '../../api/helper'
import Loader from "react-loader-spinner";
import DropZoneReplaceTbl from '../Add Order/DropZoneReplaceTbl'
import { connect } from 'react-redux';


const CampaignDetails = (props) => {

    // useEffect(() => {document.body.style = 'background: #F2F5F9;'})

    const [scriptFiles,setScriptFiles] = useState([]);
    const [audioFiles,setAudioFiles] = useState([]);
    const [normalFiles,setNormalFiles] = useState([]);
    const [campaignDetails,setCampaignDetails] = useState({
        advertiser:'',
        orderName:'',
        orderNumber:'',
        salesOrganisation:'',
        status:'Unknown',
        actionRequiredBy:'',
        nextActionDueBy:'',
        accountManager:'',
        distPartnerComapny:'',
        salesManager:'',
        graphicsDesigner:'',
        productionProgress:'Unknown',
        description:'',
        preferredURL:'',
        distBudget:'',
        targetMarket:'',
        indusCategory:'',
        orderDates:'Unknown'
        })
    const {id} = useParams();
    const [loadingScript,setLoadingScript] = useState(false);
    const [loadingAudio,setLoadingAudio] = useState(false);
    const [loadingNormal,setLoadingNormal] = useState(false);
    const [fetched,setFetched] = useState(false);

    useEffect(() => { 
        if(id)
        {       
        getCampaignDetailByID(id)
        .then(res => {
            console.log(res);
            setCampaignDetails(
                {...campaignDetails,
                advertiser:res.clientCompany.companyName,
                orderNumber:res.clientCampaignNumber,
                salesOrganisation:res.SalesOrgCompany.companyName,
                actionRequiredBy:res.statusWithPerson.firstName + res.statusWithPerson.lastName,
                nextActionDueBy:res.statusByPerson.firstName + res.statusByPerson.lastName,
                accountManager:res.sram.firstName + res.sram.lastName,
                distPartnerComapny:'Unknown',
                salesManager:res.sos.firstName + res.sos.lastName,
                graphicsDesigner:'Unknown',
                description:res.description,
                preferredURL:res.landingpageURL,
                distBudget:res.distributionBudget,
                targetMarket:res.targetMarket,
                indusCategory:res.clientCompany.Industry.name,
                campaignID:res.CampaignInventories[0].campaignID,
                uploadedBy:props.personalDetails.id,
            }
            )
            let tempNormalFiles = [];
            for(let file of res.CampaignAssets)
            {
                if(file.type == 'OTHER')
                {
                    tempNormalFiles.push(file);
                }
                else if(file.type == 'SCRIPT')
                {
                    setScriptFiles([...scriptFiles,file])
                }
                else if(file.type == 'AUDIO')
                {
                    setAudioFiles([...audioFiles,file])
                }
            }
            setNormalFiles(tempNormalFiles);
            setFetched(true); //Files are Fetched don't concat them again
        }
        )
        .catch(err => alert(err))
    }},[id,props.personalDetails.id])

    const handleBack = () =>
    {
        console.log(props.history);
        props.history.replace("/dashboard");
    }

    const uploadHandler = (e) =>
    {
        if(e.target.id == "scriptFileSelect")
        {
            uploadData("scriptFiles",e.target.files[0],setLoadingScript,setLoadingAudio,setLoadingNormal,props.addAssetsPayload,scriptFiles,setScriptFiles)
        }
        else if(e.target.id == "audioFileSelect")
        {
            uploadData("audioFiles",e.target.files[0],setLoadingScript,setLoadingAudio,setLoadingNormal,props.addAssetsPayload,audioFiles,setAudioFiles)
        }
        else if(e.target.id == "assetsFileSelect")
        {
            
            uploadData("normalFiles",e.target.files,setLoadingScript,setLoadingAudio,setLoadingNormal,props.addAssetsPayload,normalFiles,setNormalFiles);
        }
        
    }

    const style = {
        display:'flex',
        height:'100%',
        width:'100%',
        borderStyle: 'solid',
        outline: 'none',
        borderSize:'10px',
        alignItems:'center',
        justifyContent:'center',
        padding:'7px 2px'
    }

    return (
        
       id && <div className="w-100" style={{height:'100vh'}} >
            <div className="container">
            <Row color="primary" className="mt-5 mb-4 ml-1">
                <Col>
                    <Row className="text-secondary font-weight-bold">Advertiser</Row>
                    <Row className="font-weight-bold">{campaignDetails.advertiser ? campaignDetails.advertiser : "Unknown"}</Row>
                    
                </Col>
                <Col>
                    <Row className="text-secondary font-weight-bold">Order Name</Row>
                    <Row className="font-weight-bold">{campaignDetails.orderName ? campaignDetails.orderName : "Unknown"}</Row>
                    
                </Col>
                <Col>
                    <Row className="text-secondary font-weight-bold">Order Number</Row>
                    <Row className="font-weight-bold">{campaignDetails.orderNumber ? campaignDetails.orderNumber : "Unknown"}</Row>
                    
                </Col>
                <Col>
                    <Row className="text-secondary font-weight-bold">Sales Organisation</Row>
                    <Row className="font-weight-bold">{campaignDetails.salesOrganisation ? campaignDetails.salesOrganisation : "Unknown"}</Row>
                    
                </Col>
            </Row>
            <Row className="bg-white shadow p-3 rounded-30 mx-auto">
                <Container fluid>
    
                        <Row>
                            <Col>
                                <Row className="text-secondary font-weight-bold">Status</Row>
                                <Row className="font-weight-bold">{campaignDetails.status ? campaignDetails.status : "Unknown"}</Row>
                                
                            </Col>
                            <Col>
                                <Row className="text-secondary font-weight-bold">Action required By</Row>
                                <Row className="font-weight-bold">{campaignDetails.actionRequiredBy ? campaignDetails.actionRequiredBy : "Unknown"}</Row>
                                
                            </Col>
                            <Col>
                                <Row className="text-secondary font-weight-bold">Next Action Due By</Row>
                                <Row className="font-weight-bold">{campaignDetails.nextActionDueBy ? campaignDetails.nextActionDueBy : "Unknown"}</Row>
                                
                            </Col>
                            <Col>
                                <Row className="mt-1 ml-5 font-weight-bold"><Button className="border" color="white"><GiBackwardTime/></Button></Row>
                            </Col>
                        </Row>
                    
                </Container>
            </Row>
            <Row className="bg-white shadow p-3 rounded-30 mx-auto mt-1">
                <Container>
                    
                    <Row className="text-secondary font-weight-bold">Information</Row>
                    <Row className="dropdown-divider" style={{marginLeft:'-18px'}}></Row>
                    
                    <Row md={12}>
                        <Col md={4}>
                            <Row md={12} className="mr-5">
                            <div class="card text-black w-100" style={{background:'#e9ecef'}}>
                                <div className="ml-2 mt-auto mb-auto mr-2 text-secondary font-weight-bold">Account Manager Assigned</div>
                            </div>
                            </Row>
                            <Row>
                                {campaignDetails.accountManager ? campaignDetails.accountManager : "Unknown"}
                            </Row>
                        </Col>
                        <Col md={1} className="border-left"></Col>
                        <Col md={4}>
                            <Row md={12}>
                            <div className="card text-black w-100" style={{background:'#e9ecef'}}>
                                <div className="ml-2 mt-auto mb-auto mr-2 text-secondary font-weight-bold">Distribution Partner Comapnay assigned</div>
                            </div>
                            </Row>
                            <Row>
                                {campaignDetails.distPartnerComapny ? campaignDetails.distPartnerComapny : "Unknown"}
                            </Row>
                        </Col>
                    </Row>   

                    <Row md={12} className="mt-4">
                        <Col md={4}>
                            <Row md={12} className="mr-5">
                            <div className="card text-black w-100" style={{background:'#e9ecef'}}>
                                <div className="ml-2 mt-auto mb-auto mr-2 text-secondary font-weight-bold">Sales Manager Assigned</div>
                            </div>
                            </Row>
                            <Row>
                                {campaignDetails.salesManager ? campaignDetails.salesManager : "Unknown"}
                            </Row>
                        </Col>
                        <Col md={1} className="border-left"></Col>
                        <Col md={4}>
                            <Row md={12}>
                            <div className="card text-black w-100" style={{background:'#e9ecef'}}>
                                <div className="ml-2 mt-auto mb-auto mr-2 text-secondary font-weight-bold">Graphic Designer Assigned</div>
                            </div>
                            </Row>
                            <Row>
                                {campaignDetails.graphicsDesigner ? campaignDetails.graphicsDesigner : "Unknown"}
                            </Row>
                        </Col>
                    </Row>

                    <Row md={12} className="mt-4 text-secondary font-weight-bold">Production Progress</Row>
                    <Row className="dropdown-divider" style={{marginLeft:'-18px'}}></Row>
                    
                    <Row className="mt-4 ml-4 font-weight-bold">{campaignDetails.productionProgress ? campaignDetails.productionProgress : "Unknown"}</Row>

                    <Row className="mt-4 text-primary font-weight-bold">
                        <span><FaDownload/> Download All Assets</span>
                    </Row>

                    {/* Assets Form start */}

                    <Row>
                            <Col md={12}>
                            <div className="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Script File</div>
                            </div>
                            </Col>
                    </Row>
                    <Row className="mt-3 ml-3 mb-3">
                        <Col md={6}>
                            {!loadingScript

                            ?scriptFiles.length<=0 
                                ? <Dropzone maxFiles={1} accept={'.pdf,.doc'} onDrop={acceptedFiles => {uploadData("scriptFiles",acceptedFiles[0],setLoadingScript,setLoadingAudio,setLoadingNormal,campaignDetails.campaignID,campaignDetails.uploadedBy,scriptFiles,setScriptFiles);}}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                            <div {...getRootProps({style})}>
                                                <input {...getInputProps()} />
                                                <FcDocument size="80"/>
                                                <div>{ scriptFiles.length>0 ? scriptFiles.map((file,id) => <p key={id} style={{marginLeft:'15px',marginBottom:'0px'}}>{file.name}</p> ) :<p>Drag 'n' Drop Your FILE Here</p>}</div>
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                : <DropZoneReplaceTbl type="script" files={scriptFiles}/>
                            : <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Loader type={"Bars"} color="#00BFFF"/></div>
                            }
                        </Col>
                        <Col md={1}><strong>OR</strong></Col>
                        <Col md={2} style={{maxWidth:'135px'}}>
                            <label
                                htmlFor="scriptFileSelect"
                                className="custom-file-upload">Upload</label>
                            <input
                                disabled={scriptFiles.length>0}
                                id="scriptFileSelect"
                                type="file"
                                name="scriptFileSelect"
                                onChange={uploadHandler}
                                accept={'.pdf,.doc'}
                            />
                        </Col>
                    </Row>
                    <Row>
                            <Col md={12}>
                            <div class="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Voice File</div>
                            </div>
                            </Col>
                    </Row>
                    <Row className="mt-3 ml-3 mb-3">
                        <Col md={6}>
                            {
                            !loadingAudio 
                            ? audioFiles.length<=0 
                                    ? <Dropzone maxFiles={1} accept={'audio/*'} onDrop={ (acceptedFiles,fileRejections) => {
                                            uploadData("audioFiles",acceptedFiles[0],setLoadingScript,setLoadingAudio,setLoadingNormal,campaignDetails.campaignID,campaignDetails.uploadedBy,audioFiles,setAudioFiles);
                                            } }>
                                            {({getRootProps, getInputProps}) => (
                                                <section>
                                                <div {...getRootProps({style})}>
                                                    <input {...getInputProps()} />
                                                    <FaMicrophone size="70" style={{color:'#11A1DD'}}/>
                                                    <div><p>Drag 'n' Drop Your FILE Here</p></div>
                                                </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    : <DropZoneReplaceTbl type="audio" files={audioFiles}/>
                            : <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Loader type={"Bars"} color="#00BFFF"/></div>
                            }
                        </Col>
                        <Col md={1}><strong>OR</strong></Col>
                        <Col md={2} style={{maxWidth:'135px'}}>
                            <label
                                htmlFor="audioFileSelect"
                                className="custom-file-upload">Upload</label>
                            <input
                                disabled={audioFiles.length>0}
                                id="audioFileSelect"
                                type="file"
                                name="audioFileSelect"
                                onChange={uploadHandler}
                                accept={'audio/*'}
                            />
                        </Col>
                    </Row>
                    

                    <Row>
                            <Col md={12}>
                            <div class="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Advertise Assets</div>
                            </div>
                            </Col>
                    </Row>
                    <Row className="mt-3 ml-3 mb-3">
                        <Col md={6}>
                            {!loadingNormal ?
                            <Dropzone onDrop={acceptedFiles => {uploadData("normalFiles",acceptedFiles,setLoadingScript,setLoadingAudio,setLoadingNormal,campaignDetails.campaignID,campaignDetails.uploadedBy,normalFiles,setNormalFiles);}}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps({style})}>
                                        <input {...getInputProps()} />
                                        <RiCheckboxMultipleBlankLine size="70" style={{color:'#11A1DD'}}/>
                                        <div><p>Drag 'n' Drop Your FILE Here</p></div>
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                            : <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Loader type={"Bars"} color="#00BFFF"/></div>
                            }
                        </Col>
                        <Col md={1}><strong>OR</strong></Col>
                        <Col md={2} style={{maxWidth:'135px'}}>
                            <label
                                htmlFor="assetsFileSelect"
                                className="custom-file-upload">Upload</label>
                            <input
                                // disabled={audioFlag}
                                id="assetsFileSelect"
                                type="file"
                                name="assetsFileSelect"
                                onChange={uploadHandler}
                                multiple
                            />
                        </Col>
                    </Row>

                    {/* Assets Form End */}
                    
                    <Row md={12} className="mt-2">
                            <div className="card text-black w-25" style={{background:'#e9ecef'}}>
                                <div className="ml-2  mt-auto mb-auto text-secondary font-weight-bold">Advertiser Asset List</div>
                            </div>
                    </Row>

                    <Row className={"mt-2"}>
                        <Col md={12} style={{background:'#F1FBFF',maxWidth:'97%',margin:'auto'}}>
                        {!loadingNormal ?

                        normalFiles.length>0 && <Table responsive borderless className="mt-2">
                                            <thead>
                                                <tr className="text-secondary">
                                                    <th>File Name</th>
                                                    <th>File Uploaded By</th>
                                                    <th>File Uploaded Date</th>
                                                    <th>Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {normalFiles.map((file,id) => <tr key={id}>
                                                <td>{file.assetOrignalName}</td>
                                                <td>{"Parth Vaghela"}</td>
                                                <td>{new Date(file.updatedAt).toDateString()}</td>
                                                <td><button style={{border:'none',background:'inherit'}} onClick={() => {window.open(`${file.assetUrl}`)}}><FaDownload color="blue"/> Download</button></td>
                                                </tr>)}
                                            </tbody>
                        </Table>
                        : <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Loader type={"Bars"} color="#00BFFF"/></div>
                        }
                        </Col>
                    </Row>

                    <Row md={12} className="mt-4 text-secondary font-weight-bold">Order</Row>
                    <Row className="dropdown-divider" style={{marginLeft:'-18px'}}></Row>

                    <Row className="mb-3">
                        <Col md={4}>
                        <Row className="text-secondary font-weight-bold">Description</Row>
                        <Row>{campaignDetails.description ? campaignDetails.description : "Unknown"}</Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4}>
                                <Row className="text-secondary font-weight-bold">Preferred Landing Url</Row>
                                <Row className="text-primary">{campaignDetails.preferredURL ? campaignDetails.preferredURL : "Unknown"}</Row>
                        </Col>
                        <Col md={4}>
                                <Row className="text-secondary font-weight-bold">Distribution Budget</Row>
                                <Row>{campaignDetails.distBudget ? campaignDetails.distBudget : "Unknown"}$</Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={4}>
                                <Row className="text-secondary font-weight-bold">Target Market</Row>
                                <Row className="text-primary">{campaignDetails.targetMarket ? campaignDetails.targetMarket : "Unknown"}</Row>
                        </Col>
                        <Col md={4}>
                                <Row className="text-secondary font-weight-bold">Industry Category</Row>
                                <Row>{campaignDetails.indusCategory ? campaignDetails.indusCategory : "Unknown"}</Row>
                        </Col>
                        <Col md={4}>
                                <Row className="text-secondary font-weight-bold">Order Dates</Row>
                                <Row>{campaignDetails.orderDates ? campaignDetails.orderDates : "Unknown"}</Row>
                        </Col>
                    </Row>
                    
                </Container>
            </Row>


            <Row className="mt-2 mb-4 mr-2">
                            <Col md={3}><Button color="primary" className="w-80">Download All Assets</Button></Col>
                            <Col md={5}></Col>
                            <Col md={2}><Button color="primary" className="w-100">Edit</Button></Col>
                            <Col md={2}><Button onClick={handleBack} color="white" className="w-100 border border-dark mr-5">Back</Button></Col>      
            </Row>  
            <Row></Row> 
            </div>
        </div>
                                )
}

const mapStateToProps = state =>
{
    return{
      token : state.token,
      personalDetails : state.personalDetails,
    }
}

export default connect(mapStateToProps)(CampaignDetails)
