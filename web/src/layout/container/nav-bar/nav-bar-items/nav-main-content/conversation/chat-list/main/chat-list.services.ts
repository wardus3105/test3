import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
import axios from "axios";
import { ENUM_KIND_OF_ATTACHMENT } from "../../../../../../../../libraries/Enum/attachment";

function ChatListServices() {
    let instance: any;

    function init() {
        return {
            getAttachmentImageGroupDetail: async (chatRoomId: string) => {
                return await axios({
                    method: "GET",
                    url: `http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}?ChatRoomId=${chatRoomId}&TypeAttachment=${ENUM_KIND_OF_ATTACHMENT.IMAGE}&page=1&pageSize=25`,
                    timeout: 30000
                })
                    .then((res) => res)
                    .catch((err) => console.log(err))
            }
        }
    };

    const createChatRoom = (formData: any) => {
        return axios({
            method: "POST",
            url: `http://${process.env.REACT_APP_IPADDRESS_API}/api/chat-rooms`,
            headers: {
                "content-type": 'application/json',
            },
            data: formData,
            timeout: 30000
        })
            .then((res) => res)
            .catch((err) => console.log(err))
    }

    const getInstance = () => {
        if (!instance) instance = init();
        return instance;
    }

    return { createChatRoom, getInstance };
    // return {
    //     getInstance : () => {
    //         if (!instance) instance = init();
    //         return instance;
    //     },
    // }
}

export default ChatListServices;
