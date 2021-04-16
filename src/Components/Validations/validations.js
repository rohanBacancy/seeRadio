
export const checkEmail = email =>
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( !(re.test(String(email).toLowerCase())))
    {
        return false;
    }
    else 
    {
        console.log("true");
        return true;
    }                    
}

export const checkPhone = phone =>
{
    const rephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if( !(rephone.test(String(phone))) )
    {
        return false;
    } 
    else
    {
        return true;
    }
}

export const checkFormValid = errorMsgs =>
{
    let sum=0;
    for(let msg in errorMsgs)
    {
        sum+=errorMsgs[msg].length;
    }
    if(sum==0) // No Error Msg Exist
    { return true; }
    else // Atleast one or more error messages exist
    { return false; }
}

export const checkPassRePass = (newPass,confirmPass) =>
{
    if(newPass == confirmPass)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export const checkWebsiteURL = url => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
}

// export const checkPostal = postal => {
//     let pat = /^(\d{6})$/
//     return !!pat.test(postal)
// }

export const checkNumeric = val =>
{
    if(isNaN(val))
    {
        return false
    }
    else
    {
        return true
    }
}

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

export const getToDateInddmmyyyy = () =>
{
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'/'+dd+'/'+yyyy;
    return(today);
}

export const checkPostal = (postal,countryCode) => {
    let isValidUS = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let isValidCA = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if(countryCode == 'CA')
        return !!isValidCA.test(postal)
    if(countryCode == 'US')
        return !!isValidUS.test(postal)
    else
        return false;
}

//us regex - let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
//ca regex - let regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;