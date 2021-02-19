import React from 'react';
import LoadingSpinnerScreen from '../../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';
import ImageContextChatScreen from '../context-chat/image-context-chat/image-context-chat.screen';
import TextContextChatScreen from '../context-chat/text-context-chat/text-context-chat.screen';
import CurrentChatScreen from '../current-chat/current-chat.screen';
import GuestChatScreen from '../guest-chat/guest-chat.screen';
import DatetimeContextChatScreen from '../context-chat/datetime-context-chat/datetime-context-chat.screen';
import getTimePeriod from '../../../../../../../../libraries/Functions/get-time-period';
import './chat-list.scss';
import ChatListAdapter from './chat-list.adapter';
import moment from "moment";
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';

function ChatListScreen(props: any){
    const { chats , count , page , setPage , isUpdating , id , hasSearch } = props;

    const {
        userid,
        isMainLoading,
        chatlistRef,
        chatList,
        handleScroll,
        clickFirstMessage
    } = ChatListAdapter(chats , count , page , setPage , isUpdating , id)

    const length = chatList.length;
    const showAllMessages = () =>{
        if(chatList && length > 0){
            let datetimeContext = moment();
            const list = [...chatList].reverse();
            return list.map((chat: any , index: number) =>{
                let eleMainContext = <></>;
                let eleDatetime = <></>;

                const createAt = moment(chat.createdAt);
                const areEqual = datetimeContext.startOf('day').isSame(createAt.startOf('day'));
                if(!areEqual){
                    datetimeContext = createAt;
                    eleDatetime = <DatetimeContextChatScreen datetime={ datetimeContext.format("DD/MM/YYYY") }></DatetimeContextChatScreen>;
                }

                const isCurrent: boolean = chat.userId === userid;
                const eleContext =( 
                    <div className="maincontext">
                        <TextContextChatScreen 
                            isCurrent={ isCurrent }
                            context={ chat.message }
                            datetime={ getTimePeriod(chat.createdAt) }
                        ></TextContextChatScreen>
                        {/* <ImageContextChatScreen
                        isCurrent={ isCurrent }
                        context={ chat.attachments }
                        datetime={ getTimePeriod(chat.createdAt) }
                        ></ImageContextChatScreen> */}
                    </div>

                )
                if(isCurrent){
                    eleMainContext = <CurrentChatScreen>
                        { eleContext }
                    </CurrentChatScreen>
                } else{
                    eleMainContext = (
                        <GuestChatScreen
                            id={ id }
                            kindOfMess={ 0 }
                            user={ chat.user } 
                            context={ chat.context }
                        >
                            { eleContext }
                        </GuestChatScreen>
                    )
                }
                return (
                    <div key={ index }>
                        { eleDatetime }
                        { eleMainContext }
                    </div>
                )
            })
        }
    }
    if(length > 0){
        return (
            <div className={ "chatlist-container " + (hasSearch ? " chatlist-container-hassearch" : "") } onScroll={ handleScroll } ref={ chatlistRef }>            
                {
                    isMainLoading ? (
                        <div className="chatlist-loader">
                            <LoadingSpinnerScreen class="loader-big"></LoadingSpinnerScreen>
                        </div>
                    ) : (
                        <div className="chatlist-main">
                            {
                                showAllMessages()
                            }
                            {
                                length < count && <LoadingSpinnerScreen class="loader-small"></LoadingSpinnerScreen>
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <div className="chatlist-container" >            
            {
                <DataNotFoundScreen onClick={ clickFirstMessage } isPosition={ false } icon={ ENUM_KIND_OF_NOTFOUNDICON.MESSAGE } text="Nhấn để xin chào"></DataNotFoundScreen>
            }
        </div>
    ) 

}

export default ChatListScreen;
