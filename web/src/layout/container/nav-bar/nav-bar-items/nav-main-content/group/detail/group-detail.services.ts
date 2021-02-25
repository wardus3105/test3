import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../libraries/Enum/attachment';

import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";

const GroupDetailServices = () => {
    let instance: any;

    function init() {
        return {
            getInforGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.API_CHAT_ROOM}/${chatRoomId}`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_MEMBER_IN_CONVERSION}/${chatRoomId}?page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getLinkGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_LIST_LINK_IN_ROOMCHAT}/${chatRoomId}?page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            getAttachmentImageGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}/${chatRoomId}/0?page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getAttachmentFileGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}/${chatRoomId}/${ENUM_KIND_OF_ATTACHMENT.FILE}?page=1&pageSize=25`,
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
