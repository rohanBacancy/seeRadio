export const SETLOGIN = "SETLOGIN";
export const SETUSER = "SETUSER";
export const SETTOKEN = "SETTOKEN";
export const DOLOGOUT = "DOLOGOUT";

export const setLogin = (boolIs) =>
{
    return{
        type:SETLOGIN,
        boolIs:boolIs,
    }
}

export const setUser = (email,token,personalDetails) =>
{
    return{
        type:SETUSER,
        email:email,
        token:token,
        personalDetails:personalDetails,SETTOKEN
    }
}

export const setToken = (token) =>
{
    return{
        type:SETTOKEN,
        token:token
    }
}

export const doLogout = () =>
{
    return{
        type:DOLOGOUT
    }
}