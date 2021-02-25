export default function getApiUrl(id: string){
    if(id){
        return process.env.REACT_APP_IPADDRESS_FILE + "" + process.env.REACT_APP_IPADDRESS_FILE_PATH + id;
    }
    return process.env.REACT_APP_IPADDRESS_FILE + "" + process.env.REACT_APP_IPADDRESS_FILE_PATH + "111";

}