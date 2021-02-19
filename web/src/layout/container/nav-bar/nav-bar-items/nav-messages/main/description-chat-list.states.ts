import { useState } from 'react';
import { IDescriptionChat } from '../description-chat/description-chat.props';

function DescriptionChatListStates() {
    const [query , setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages , setTotalPages] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [hasSearch, setHasSearch] = useState<boolean>(false);
    const [descriptionChatList, setDescriptionChatList] = useState<IDescriptionChat[]>([]);
    const [searchDescriptionChatList, setSearchDescriptionChatList] = useState<IDescriptionChat[]>([]);
    const [activedDescriptionChat , setActivedDescriptionChat] = useState<string>("");

    return {
        query, setQuery,
        page, setPage,
        totalPages , setTotalPages,
        isUpdating, setIsUpdating,
        descriptionChatList, setDescriptionChatList,
        activedDescriptionChat , setActivedDescriptionChat,
        hasSearch, setHasSearch,
        searchDescriptionChatList, setSearchDescriptionChatList
    }
}

export default DescriptionChatListStates;