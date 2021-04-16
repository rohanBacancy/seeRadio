import React from 'react'
import { useState } from 'react'
import AddAdvertiser from './AddAdvertiser';
import AddAssets from './AddAssets';
import AddOrder from './AddOrder';
import CustomStepper from '../stepper/CustomStepper';


const RootStepper = (props) => {


    const [stepNo,setStepNo] = useState(1);

    //AddAdvertiser Form state and Error Messages
    const [addAdvertiserDetails,setAddAdvertiserDetails] = useState({
        companyName:'',
        companyWebsite:'',
        individualCategory:'07b3c5c4-c5cb-45b7-86c3-47dfcd4a403b',
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        secContactTgl:'',
        secFirstName:'',
        secLastName:'',
        secEmail:'',
        secPhone:'',
        address:'',
        address2:'',
        city:'',
        country:'CA',
        state:'',
        provinceID:'',
        postalCode:'',
        billingTgl:'',
        billingAddress:'',
        billingAddress2:'',
        billingCity:'',
        billingCountry:'CA',
        billingState:'',
        billingPostalCode:'',
        resp:{},
    })

    const [addAdvertisererrorMsgs,setAddAdvertiserErrorMsgs] = useState({ //Error Messages for form inputs
        companyNameError:'',
        companyWebsiteError:'',
        individualCategoryError:'',
        firstNameError:'',
        lastNameError:'',
        emailError:'',
        phoneError:'',
        secFirstNameError:'',
        secLastNameError:'',
        secEmailError:'',
        secPhoneError:'',
        addressError:'',
        address2Error:'',
        cityError:'',
        countryError:'',
        stateError:'',
        postalCodeError:'',
        billingAddressError:'',
        billingAddress2Error:'',
        billingCityError:'',
        billingCountryError:'',
        billingStateError:'',
        billingPostalCodeError:'',
    })

    //AddOrder Form state and Error Messages
    const [addOrderDetails,setAddOrderDetails] = useState({
        advertiser:'',
        title:'',
        landingURL:'',
        price:'',
        description:'',
        targetMarket:'1f69035a-7339-451b-9ad6-ab81697d2fd9',
        budget:'',
        soaID:'',
        sosID:'',
        salesOrgCompanyID:'',
        statusByPersonID:'',
        statusWithPersonID:'',
        resp:{},
    })

    const [addOrdererrorMsgs,setAddOrderErrorMsgs] = useState({ //Error Messages for form inputs
        advertiserError:'',
        titleError:'',
        landingURLError:'',
        priceError:'',
        descriptionError:'',
        targetMarketError:'',
        budgetError:'',
    })

    const [addAssetsPayload,setAddAssetsPayload] = useState({
        campaignID:'',
        uploadedBy:'',
        clientID:'',
    })

    // //AddAssets Form state and Error Messages
    const [scriptFiles,setScriptFiles] = useState([]);
    const [audioFiles,setAudioFiles] = useState([]);
    const [normalFiles,setNormalFiles] = useState([]);
    

    const handleCancel = () =>
    {
        props.history.replace("/dashboard");
    }


    let outPut;
    let stepper;

        if(stepNo == 1)
        {
            stepper = <div><CustomStepper activeStep={1}/></div>
            outPut = <AddAdvertiser addAdvertiserDetails={addAdvertiserDetails} setAddAdvertiserDetails={setAddAdvertiserDetails} addAdvertisererrorMsg={addAdvertisererrorMsgs} setAddAdvertiserErrorMsgs={setAddAdvertiserErrorMsgs} setStepNo={setStepNo} handleCancel={handleCancel} addOrderDetails={addOrderDetails} setAddOrderDetails={setAddOrderDetails}/>
        }
        else if(stepNo == 2)
        {
            stepper = <div><CustomStepper activeStep={2}/></div>
            outPut = <AddOrder addOrderDetails={addOrderDetails} setAddOrderDetails={setAddOrderDetails} addOrdererrorMsgs={addOrdererrorMsgs} setAddOrderErrorMsgs={setAddOrderErrorMsgs} setStepNo={setStepNo} handleCancel={handleCancel} addAssetsPayload={addAssetsPayload} setAddAssetsPayload={setAddAssetsPayload}/> 
        }
        else if(stepNo == 3)
        {
            stepper = <div><CustomStepper activeStep={3}/></div>
            outPut = <AddAssets scriptFiles={scriptFiles} audioFiles={audioFiles} normalFiles={normalFiles} setScriptFiles={setScriptFiles} setAudioFiles={setAudioFiles} setNormalFiles={setNormalFiles} setStepNo={setStepNo} handleCancel={handleCancel} addAssetsPayload={addAssetsPayload} setAddAssetsPayload={setAddAssetsPayload}/>
        }

        
    return (
        <>
            {stepper}
            {outPut}
       </>
    )
}



export default RootStepper
