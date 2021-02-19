import { IImageContextChat } from "./image-context-chat.props";
// input cua nguoi khac
function ImageContextChatAdapter(props : IImageContextChat){

    if(props.context.length > 0){
        return props.context
    }

    return null
}

export default ImageContextChatAdapter;
