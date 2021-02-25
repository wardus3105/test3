
import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";

const GroupDetailServices = () => {
    let instance: any;

    function init() {
        return {
            getGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_CHATROOMDETAIL}`,
                    params: {
                        id: chatRoomId
                    },
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

export default GroupDetailServices;
