import React from 'react'
import { useEffect } from 'react';
import { Row,Col,Form,FormGroup,Input,Label, Container, Button, Table } from 'reactstrap';
import Dropzone from 'react-dropzone'
import {FaMicrophone} from 'react-icons/fa'
import {RiCheckboxMultipleBlankLine} from 'react-icons/ri'
import { useState } from 'react';
import './AddAssets.css'
import DropZoneReplaceTbl from './DropZoneReplaceTbl';
import { FcDocument } from 'react-icons/fc';
import { FaDownload } from 'react-icons/fa';
import  { addAssetsPost } from '../../api/Api'
import Loader from "react-loader-spinner";

const AddAssets = ({scriptFiles,audioFiles,normalFiles,setScriptFiles,setAudioFiles,setNormalFiles,setStepNo,handleCancel,addAssetsPayload,setAddAssetsPayload}) => {

    const style = {
        display:'flex',
        height:'100%',
        width:'100%',
        borderStyle: 'solid',
        outline: 'none',
        borderSize:'10px',
        alignItems:'center',
        justifyContent:'center',
        padding:'7px 2px',
    }
    useEffect(() => {document.body.style = 'background: #F2F5F9;';})

    const [loadingScript,setLoadingScript] = useState(false);
    const [loadingAudio,setLoadingAudio] = useState(false);
    const [loadingNormal,setLoadingNormal] = useState(false);

    const attachFileUrl = (url,nm) =>
    {
        setNormalFiles(normalFiles.map(fileObj => fileObj.name == nm ? fileObj.url = url : fileObj))
    }

    const uploadData = (flag,theFile) =>
    { //SCRIPT,AUDIO,OTHER
        
        console.log(theFile);
        if(flag == 'scriptFiles')
        {
            setLoadingScript(true);
            let payload = new FormData();
            payload.append('file',theFile);
            payload.append('campaignID',addAssetsPayload.campaignID)
            payload.append('type','SCRIPT')
            payload.append('uploadedBy',addAssetsPayload.uploadedBy)
            addAssetsPost(payload)
                .then(res => {console.log(res); setLoadingScript(false);})
                .catch(err => {alert(err); setLoadingScript(false);})
        }
        else if(flag == 'audioFiles')
        {
            setLoadingAudio(true);
            let payload2 = new FormData();
            payload2.append('file',theFile);
            payload2.append('campaignID',addAssetsPayload.campaignID)
            payload2.append('type','AUDIO')
            payload2.append('uploadedBy',addAssetsPayload.uploadedBy)
            addAssetsPost(payload2)
                .then(res => {console.log(res); setLoadingAudio(false);})
                .catch(err => {alert(err); setLoadingAudio(false);})
        }
        else if(flag == 'normalFiles')
        {
                for(let file of theFile)
                {
                    setLoadingNormal(true);
                    let payload3 = new FormData();
                    payload3.append('file',file);
                    payload3.append('campaignID',addAssetsPayload.campaignID)
                    payload3.append('type','OTHER')
                    payload3.append('uploadedBy',addAssetsPayload.uploadedBy)
                    // payload3.append('clientID',addAssetsPayload.clientID)
                    
                    addAssetsPost(payload3)
                        .then(res => {
                            console.log(res);
                            setLoadingNormal(false);
                            attachFileUrl(res.data[0].assetUrl,res.data[0].assetOrignalName)
                        })
                        .catch(err => {alert(err);setLoadingNormal(false);})
                }
            }
    }

    const handleBack = () =>
    {
        setStepNo(2);
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
    }

    const uploadHandler = (e) =>
    {
        if(e.target.id == "scriptFileSelect")
        {
            setScriptFiles([e.target.files[0]])
            uploadData("scriptFiles",e.target.files[0])
        }
        else if(e.target.id == "audioFileSelect")
        {
            setAudioFiles([e.target.files[0]])
            uploadData("audioFiles",e.target.files[0])
        }
        else if(e.target.id == "assetsFileSelect")
        {
            let tmpFiles = [...normalFiles];
            for(let file of e.target.files)
            {
                tmpFiles.push(file);
            }
            setNormalFiles([...tmpFiles])
            uploadData("normalFiles",e.target.files);
        }
        
    }


    return (
        <div className="w-100" style={{height:'100vh'}} >
            <div className="container">
            <Row color="primary" className="mt-5 mb-2 text-primary font-weight-bold ml-4"><h5>Add Assets</h5></Row>
            <Row className="bg-white shadow p-3 rounded-30 mx-auto">
                <Container fluid>
                <Form>
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
                                ? <Dropzone maxFiles={1} accept={'.pdf,.doc'} onDrop={acceptedFiles => {setScriptFiles(acceptedFiles); uploadData("scriptFiles",acceptedFiles[0]);}}>
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
                                            setAudioFiles(acceptedFiles);
                                            uploadData("audioFiles",acceptedFiles[0]);
                                            } }>
                                            {({getRootProps, getInputProps}) => (
                                                <section>
                                                <div {...getRootProps({style})}>
                                                    <input {...getInputProps()} />
                                                    <FaMicrophone size="70" style={{color:'#11A1DD'}}/>
                                                    <div>{ audioFiles.length>0 ? audioFiles.map((file,id) => <p key={id} style={{marginLeft:'15px',marginBottom:'0px'}}>{file.name}</p> ) :<p>Drag 'n' Drop Your FILE Here</p>}</div>
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
                            <Dropzone onDrop={acceptedFiles => {setNormalFiles([...normalFiles,...acceptedFiles]); uploadData("normalFiles",acceptedFiles);}}>
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
                    <Row>
                            <Col md={12}>
                            <div class="card text-black" style={{background:'#e9ecef',height:'30px'}}>
                                <div className="ml-2  mt-auto mb-auto">Advertise Assets</div>
                            </div>
                            </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col md={12} style={{background:'#F1FBFF',maxWidth:'97%',margin:'auto'}}>
                        {normalFiles.length>0 && <Table responsive borderless className="mt-2">
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
                                                <td>{file.name}</td>
                                                <td>Parth Vaghela</td>
                                                <td>{new Date(file.lastModified).toDateString()}</td>
                                                <td><button style={{border:'none',background:'inherit'}}><FaDownload color="blue"/> Download</button></td>
                                                </tr>)}
                                            </tbody>
                        </Table>}
                        </Col>
                    </Row>
                        <Row className={"mt-2"}>
                            <Col md={2}><Button onClick={handleBack} color="primary w-100">Back</Button></Col>
                            <Col md={6}></Col>
                            <Col md={2}><Button onClick={handleCancel} color="white" className="border w-100">Cancel</Button></Col>
                            <Col md={2}><Button onClick={handleSubmit} color="primary w-100">Done</Button></Col>      
                        </Row>            
                </Form>
                </Container>
            </Row>
            </div>
        </div>
    )
}

export default AddAssets
