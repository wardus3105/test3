import { useState } from "react";
import { IChat, IConversation, IResponseMess } from "./conversation.props";

function ConversationStates() {
    const [page , setPage] = useState<number>(1);
    const [count , setCount] = useState<number>(0);
    const [query , setQuery] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isGroup, setIsGroup] = useState<boolean>(false);
    const [hasUploadImages, setHasUploadImages] = useState<boolean>(false);
    const [hasSearch , setHasSearch] = useState<boolean>(false);
    const [conversation , setConversation] = useState<IConversation>();
    const [listMessage, setListMessage] = useState<IChat[]>([]);
    const [respondedMess, setRespondedMess] = useState<IResponseMess>();
    
    return {
        page , setPage,
        count , setCount,
        query , setQuery,
        hasSearch , setHasSearch,
        conversation , setConversation,
        isUpdating, setIsUpdating,
        isGroup, setIsGroup,
        listMessage, setListMessage , 
        hasUploadImages, setHasUploadImages,
        respondedMess, setRespondedMess
    }
}

export default ConversationStates;
