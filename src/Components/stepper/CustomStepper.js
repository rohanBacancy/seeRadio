import './CustomStepper.css'

const CustomStepper = (props) => {
    let step = props.activeStep;

    let style = {
        complete: {
            one: 'step ml-auto completeStep',
            two: 'step completeStep'
        },
        active: {
            one: 'step ml-auto activeStep',
            two: 'step activeStep',
            three: 'step mr-auto activeStep'
        },
        incomplete: {
            two: 'step incompleteStep',
            three:'step mr-auto incompleteStep'
        }
    }
    return (
        <div className='d-flex flex-rows justify-content-center mt-3'>
            <div className={step===1?style.active.one:step===2?style.complete.one:style.complete.one}><center>step 1<br />Add Advertiser</center></div>
            <div className={ step===1?style.incomplete.two:step===2?style.active.two:style.complete.two}><center>step 2<br />Add Order</center></div>
            <div className={ step===1?style.incomplete.three:step===2?style.incomplete.three:style.active.three}><center>step 3<br />Add Assets</center></div>
        </div>
    );
}
export default CustomStepper;