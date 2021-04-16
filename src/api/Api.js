import { getPublic, getWithToken, postWithToken, postWithTokenForm } from "./Network";

//GET APIS Without Token



export const getCountries = (params) => getPublic('/pub/country/',params)



export const getState = (countryCode,params) => getPublic('/pub/states/'+countryCode,params)

//GET APIS With Token
export const getIndustries = (params) => getWithToken('/api/wholesalepricing/getIndustries',params)
export const getMarkets = (params) => getWithToken('/api/wholesalepricing/getMarkets',params)
export const getAdvertisers = (params) => getWithToken('/api/company/clients',params)
export const getCampaignDetailByID = (id,params) => getWithToken('/api/campaign/'+id,params)
// export const getSalesOrgByID = (sosID,params) => getWithToken('/api/company/salesOrg/',params)


//POST APIS With Token
export const addClient = (params) => postWithToken('/api/company/client',params)
export const addCampaign = (params) => postWithToken('/api/campaign/',params)  
export const addAssetsPost = (params) => postWithToken('/api/campaign/upload',params)  
export const getAllCampaignsPost = (params) => postWithToken('/api/campaign/getAllcampaigns/',params)  


//POST APIS Without Token
export const doLogin = (params) => postWithTokenForm('/pub/login',params)
