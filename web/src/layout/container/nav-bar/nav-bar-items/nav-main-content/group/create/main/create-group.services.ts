
import axios from "axios";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";


const CreateGroupService = () => {
    let instance: any;

    function init() {

        return {
            createGroup : async (formData: FormData) => {
                return await axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.POST_CHATROOM}`,
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
                    data: formData,
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
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default CreateGroupService;

