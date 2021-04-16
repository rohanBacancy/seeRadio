import axios from 'axios';
import { getToken } from './helper';

const baseURL = process.env.REACT_APP_API_URI

export const getPublic = ( url,params ) =>
{
    console.log("Making req to " + baseURL + url);
    return axios.get( baseURL + url , { params } )
    .then( res => res.data.data )
    .catch( err => {throw new Error(JSON.parse(err.request.response).errorMessage);} )
}

export const getWithToken = ( url,params ) =>
{
    console.log("Making req to " + baseURL + url);
    return axios.get( baseURL + url , { 
        params,
        headers : { 'x-token' : getToken() }
     } )
    .then( res => res.data.data )
    .catch( err => {throw new Error(JSON.parse(err.request.response).errorMessage);} )
}

export const postPublic = ( url,params ) =>
{
    console.log("Making req to " + baseURL + url);
    return axios.post( baseURL + url , { params } )
    .then( res => res.data.data )
    .catch( err => {throw new Error(JSON.parse(err.request.response).errorMessage);} )
}

export const postWithToken = ( url,params ) =>
{
    console.log("Making req to " + baseURL + url);
    return axios.post( baseURL + url ,  params ,{ headers : { 'x-token' : getToken() } } )
    .then( res => res.data.data )
    .catch( err => {throw new Error(JSON.parse(err.request.response).errorMessage);} )
}

export const postWithTokenForm = ( url,params ) =>
{
    console.log("Making req to " + baseURL + url);
    return axios.post( baseURL + url ,  params ,{ headers : { 'x-token' : getToken()} } )
    .then( res => res.data.data )
    .catch( err => {throw new Error(JSON.parse(err.request.response).errorMessage);} )
}