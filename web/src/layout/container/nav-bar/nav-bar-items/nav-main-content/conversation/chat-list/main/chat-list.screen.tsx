import React from 'react';
import LoadingSpinnerScreen from '../../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';
import ImageContextChatScreen from '../context-chat/image-context-chat/image-context-chat.screen';
import TextContextChatScreen from '../context-chat/text-context-chat/text-context-chat.screen';
import CurrentChatScreen from '../current-chat/current-chat.screen';
import GuestChatScreen from '../guest-chat/guest-chat.screen';
import DatetimeContextChatScreen from '../context-chat/datetime-context-chat/datetime-context-chat.screen';
import getTimePeriodFromNow from '../../../../../../../../libraries/Functions/get-time-period-from-now';
import './chat-list.scss';
import ChatListAdapter from './chat-list.adapter';
import moment from "moment";
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';
import haveSameTimePeriod from '../../../../../../../../libraries/Functions/get-time-period-between-times';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../libraries/Enum/shape_of_message';

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
            let datetimeContext = new Date();
            const list = [...chatList].reverse();
            console.log(list)
            return list.map((chat: any , index: number) =>{
                let eleMainContext = <></>;
                let eleDatetime = <></>;
                let shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                const isCurrent: boolean = chat.user.id === userid;
                const createAt = new Date(chat.createdAt);

                if(isCurrent && index > 0){
                    let haveSameTime = haveSameTimePeriod(createAt , datetimeContext)
                    if(haveSameTime){
                        shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;
    
                        if(index < list.length - 1){
                            const haveSameTime2 = haveSameTimePeriod(new Date(list[index + 1].createdAt) , createAt)
                            if(haveSameTime2){
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;
                            }
                        } else if(index === list.length - 1){
                            shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                        }
                    }
                }

                datetimeContext = createAt;
                // const haveSameDay = datetimeContext.startOf('day').isSame(createAt.startOf('day'));
                // if(!haveSameDay){
                //     eleDatetime = <DatetimeContextChatScreen datetime={ datetimeContext.format("DD/MM/YYYY") }></DatetimeContextChatScreen>;
                // }

                const eleContext =( 
                    <div className="maincontext">
                        <TextContextChatScreen 
                            isCurrent={ isCurrent }
                            context={ chat.message }
                            datetime={ getTimePeriodFromNow(chat.createdAt) }
                            shape={ shape }
                        ></TextContextChatScreen>
                        {
                            chat.attachments && (
                                <ImageContextChatScreen
                                    isCurrent={ isCurrent }
                                    context={ chat.attachments }
                                    datetime={ getTimePeriodFromNow(chat.createdAt) }
                                ></ImageContextChatScreen>
                            )
                        }
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
                        { eleMainContext }
                        { eleDatetime }
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
