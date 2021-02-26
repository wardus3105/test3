import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
import axios from "axios";
import { IChat } from "../../main/conversation.props";
import { postInstance } from "../../../../../../../../helpers/api/instance";


const ChatInputServices = () => {
    let instance: any;


    function init() {
        return {
            postMessage : async (formData: FormData) => {
                return  await postInstance(`sent-message-with-attachment` , formData , {
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            sendMessage: async (message: IChat) => {
                return axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.POST_MESSAGE}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: message,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            sendFile: async (formData: FormData) => {
                return axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.POST_FILE}`,
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
                    data: formData,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            }
        }
    }
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ChatInputServices;
