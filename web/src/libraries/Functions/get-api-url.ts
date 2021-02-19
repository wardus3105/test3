export default function getApiUrl(path: string){
    if(path){
        return process.env.REACT_APP_IPADDRESS_URL + "/" + path;
    }
    return "";
}