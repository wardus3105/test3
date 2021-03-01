import axios from "axios";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";

const CurrentChatServices = () => {
    let instance: any;

    function init() {
        return {
            removeMessage: async (message: any) => {
                return axios({
                    method:"PUT",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.PUT_REMOVE_MESSAGE}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: message,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
        }
    }
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default CurrentChatServices;
