import axios from "axios";

function ChatListServices() {
    let instance: any;

    function init() {
        // return {
        //   ,
        // }
    };

    const createChatRoom = (formData: any) => {
        return axios({
            method:"POST",
            url:`http://${process.env.REACT_APP_IPADDRESS_API}/api/chat-rooms`,
            headers: { 
                "content-type": 'application/json',
            },
            data: formData,
            timeout:30000  
        })
        .then((res)=> res)
        .catch((err) => console.log(err))
    }
    
    const getInstance = () => {
        if (!instance) instance = init();
        return instance;
    }

    return { createChatRoom, getInstance};
    // return {
    //     getInstance : () => {
    //         if (!instance) instance = init();
    //         return instance;
    //     },
    // }
}

export default ChatListServices;
