import * as actionTypes from './action';

const initialState = {
    loggedIn:false,
    currEmail:'',
    token:'',
    personalDetails:''
}

const reducer =  (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SETLOGIN:
        return { ...state, loggedIn:action.boolIs }

    case actionTypes.SETUSER:
        return{...state,currEmail:action.email,token:action.token,personalDetails:action.personalDetails}

    case actionTypes.SETTOKEN:
        return{...state,token:action.token}

    case actionTypes.DOLOGOUT:
        localStorage.removeItem('token');
        localStorage.removeItem('currUser');
        return{...state,loggedIn:false,currEmail:'',token:'',personalDetails:''}

    default:
        return state
    }
}

export default reducer;