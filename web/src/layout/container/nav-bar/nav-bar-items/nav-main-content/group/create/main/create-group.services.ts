
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
            getCompanyMemberListSearch: async (text: string) => {
                const response =  await axios({
                    method: "POST",
                    url: `http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_COMPANYMEMBERLIST_SEARCH}`,
                    data: {
                        text: text
                    }
                })
                .then((res)=>  res)
                .catch((err) => console.log(err))

                return response;
            },

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

