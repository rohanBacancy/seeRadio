import { addAssetsPost } from "./Api";

export const getToken = () =>
{
    if(localStorage.getItem('token'))
    {
        let token = localStorage.getItem('token');
        return token;
    }
    else{
        return false;
    }
}

export const uploadData = (flag,theFile,setLoadingScript,setLoadingAudio,setLoadingNormal,campaignID,uploadedBy,files,setFiles) =>
    { //SCRIPT,AUDIO,OTHER
        
        console.log("got in funv",campaignID);
        if(flag == 'scriptFiles')
        {
            setLoadingScript(true);
            let payload = new FormData();
            payload.append('file',theFile);
            payload.append('campaignID',campaignID)
            payload.append('type','SCRIPT')
            payload.append('uploadedBy',uploadedBy)
            addAssetsPost(payload)
                .then(res => {console.log(res); setFiles(res.data); setLoadingScript(false);})
                .catch(err => {alert(err); setLoadingScript(false);})
        }
        else if(flag == 'audioFiles')
        {
            setLoadingAudio(true);
            let payload2 = new FormData();
            payload2.append('file',theFile);
            payload2.append('campaignID',campaignID)
            payload2.append('type','AUDIO')
            payload2.append('uploadedBy',uploadedBy)
            addAssetsPost(payload2)
                .then(res => {console.log(res); setFiles(res.data); setLoadingAudio(false);})
                .catch(err => {alert(err); setLoadingAudio(false);})
        }
        else if(flag == 'normalFiles')
        {
                let tempNormalFiles= [...files];
                for(let file of theFile)
                {
                    setLoadingNormal(true);
                    let payload3 = new FormData();
                    payload3.append('file',file);
                    payload3.append('campaignID',campaignID)
                    payload3.append('type','OTHER')
                    payload3.append('uploadedBy',uploadedBy)
                    // payload3.append('clientID',addAssetsPayload.clientID)
                    
                    addAssetsPost(payload3)
                        .then(res => {
                            // console.log(res);
                            // console.log(files);
                            tempNormalFiles.push(res.data[0]);
                            
                                setLoadingNormal(false);
                            
                        })
                        .catch(err => {alert(err);setLoadingNormal(false);})
                }
                console.log(tempNormalFiles);
                
                setFiles(tempNormalFiles);
                
                
            }
    }