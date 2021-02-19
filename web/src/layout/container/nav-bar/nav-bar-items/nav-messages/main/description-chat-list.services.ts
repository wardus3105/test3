import { getInstance, postInstance } from "../../../../../../helpers/api/instance";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";


function DescriptionChatListServices() {

    let instance: any;

    function init() {
        return {
            getDescriptionChatList : async (page: number) => {
                return await getInstance(URL_PATHS.GET_CONVERSATIONLIST , {
                    params:{
                        page:page,
                        pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                    }
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            getDescriptionChatListByQuery : async (data: any) => {
                return await postInstance(URL_PATHS.GET_CONVERSATIONLIST_BYQUERY , data , {
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
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

export default DescriptionChatListServices;