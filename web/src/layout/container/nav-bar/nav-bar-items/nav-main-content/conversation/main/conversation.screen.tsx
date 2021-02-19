import React from 'react';
import HeaderConversationScreen from '../header/header-conversation.screen'
import ChatListScreen from '../chat-list/main/chat-list.screen';
import ChatInputScreen from '../chat-input/main/chat-input.screen';
import SearchChatScreen from '../chat-list/search-chat/search-chat.screen';
import ConversationAdapter from './conversation.adapter';
import './conversation.scss';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import GroupConversationScreen from '../../group/conversation/group-conversation.screen';
import PersonalConversationScreen from '../../personal/conversation/personal-conversation.screen';
import useIdInPath from '../../../../../../../libraries/Hooks/useIdInPath';

function ConversationScreen(){
    const {
        query , setQuery,
        hasSearch,
        conversation,
        onSearch,
        count,
        page , setPage,
        isUpdating,
        isGroup, listMessage, setListMessage,
        redirectToDetail
    } = ConversationAdapter();

    let eleOptionHeader = null;
    if(isGroup){
        eleOptionHeader = GroupConversationScreen()
    } else{
        eleOptionHeader = PersonalConversationScreen()
    }

    const roomId = useIdInPath()

    // if(conversation){
        return (
            <div className="conversation-container">
    
                <HeaderConversationScreen
                id={ conversation?.id }
                title={ conversation?.title }
                avatar={ conversation?.avatar }
                isOnline={ conversation?.status === ENUM_KIND_OF_STATUS.ACTIVE  }
                eleOptionHeader={ eleOptionHeader(onSearch) }
                isGroup={ isGroup }
                hasSearch={ hasSearch }
                onSearch={ onSearch }
                setQuery={ setQuery }
                onClickAvatar={ () =>{ redirectToDetail(conversation?.id || "") } }
                ></HeaderConversationScreen>
    
                {
                    hasSearch && (
                        <SearchChatScreen query={ query }></SearchChatScreen>
                    )
                }
                
                <ChatListScreen
                    id={ roomId }
                    chats={ listMessage }
                    hasSearch={ hasSearch }
                    count={ count }
                    page={ page }
                    setPage={ setPage }
                    isUpdating={ isUpdating }
                ></ChatListScreen>
                
                <ChatInputScreen listMessage={listMessage} setListMessage={setListMessage} id={ conversation?.id }></ChatInputScreen>
            </div>
        )
    // }

    // return (
    //     <div></div>
    // )


}

export default ConversationScreen;