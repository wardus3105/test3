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
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';
import haveSameTimePeriod from '../../../../../../../../libraries/Functions/get-time-period-between-times';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../libraries/Enum/shape_of_message';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../libraries/Enum/message';

function ChatListScreen(props: any) {
    const { chats, count, page, setPage, isUpdating, roomId, hasSearch, setRespondedMess } = props;

    const {
        userid,
        isMainLoading,
        chatlistRef,
        chatList,
        handleScroll,
        clickFirstMessage,
        bottom,
        setChatList
    } = ChatListAdapter({ chats, count, page, setPage, isUpdating, roomId, setRespondedMess })

    const length = chatList.length;
    const showAllMessages = () => {
        if (chatList && length > 0) {
            const list = [...chatList]
            let datetimeContext = new Date(list[0].createdAt);

            return list.map((chat: any, index: number) => {
                let eleMainContext = <></>;
                let eleDatetime = <></>;
                let shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                const isCurrent: boolean = chat.user.id === userid;
                const createAt = new Date(chat.createdAt);

                if (isCurrent && chat.messageType === ENUM_KIND_OF_MESSAGE.TEXT) {
                    let haveSameTime = haveSameTimePeriod(datetimeContext, createAt)
                    if (haveSameTime) {
                        shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;

                        if (index < list.length - 1) {
                            const haveSameTime2 = haveSameTimePeriod(createAt, new Date(list[index + 1].createdAt))
                            if (haveSameTime2) {
                                if (index === 0) {
                                    shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                                } else {
                                    shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;
                                }
                            } else {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                            }
                        } else {
                            shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                        }
                    } else {
                        shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;

                        if (index < list.length - 1) {
                            const haveSameTime2 = haveSameTimePeriod(createAt, new Date(list[index + 1].createdAt))
                            if (haveSameTime2) {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                            } else {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                            }
                        } else {
                            shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                        }
                    }
                }

                datetimeContext = createAt;
                // const haveSameDay = datetimeContext.startOf('day').isSame(createAt.startOf('day'));
                // if(!haveSameDay){
                //     eleDatetime = <DatetimeContextChatScreen datetime={ datetimeContext.format("DD/MM/YYYY") }></DatetimeContextChatScreen>;
                // }

                const respondedMess = chat.parent ? chat.parent : (chat.respondedMess ? chat.respondedMess : null);
                console.log("🚀 ~ file: chat-list.screen.tsx ~ line 86 ~ returnlist.map ~ respondedMess", respondedMess)

                const eleContext = (
                    <div className="maincontext">
                        {
                            chat.attachments.length > 0 ? (
                                <ImageContextChatScreen
                                    isCurrent={isCurrent}
                                    context={chat.attachments}
                                    datetime={getTimePeriodFromNow(chat.createdAt)}
                                ></ImageContextChatScreen>
                            ) : (
                                    <TextContextChatScreen
                                        isCurrent={isCurrent}
                                        context={chat.message}
                                        datetime={getTimePeriodFromNow(chat.createdAt)}
                                        shape={shape}
                                        time={chat.createdAt}
                                        index={index}
                                        respondedMess={respondedMess}
                                    ></TextContextChatScreen>
                                )
                        }
                    </div>
                )
                if (isCurrent) {
                    eleMainContext = (
                        <CurrentChatScreen
                            roomId={roomId}
                            type={chat.messageType}
                            context={chat.message}
                            setRespondedMess={setRespondedMess}
                            messageId={chat.id}
                            userId={userid}
                            setChatList={setChatList}
                        >
                            {eleContext}
                        </CurrentChatScreen>
                    )
                } else {
                    eleMainContext = (
                        <GuestChatScreen
                            roomId={roomId}
                            type={chat.messageType}
                            user={chat.user}
                            context={chat.message}
                            setRespondedMess={setRespondedMess}
                            messageId={chat.id}
                        >
                            { eleContext}
                        </GuestChatScreen>
                    )
                }
                return (
                    <div key={index}>
                        { eleMainContext}
                        { eleDatetime}
                    </div>
                )
            })
        }
    }
    if (length > 0) {
        return (
            <div
                className={"chatlist-container " +
                    (hasSearch ? "chatlist-container-hassearch " : "")
                }
                onScroll={handleScroll}
                ref={chatlistRef}
                style={{ bottom: `${bottom}px` }}
            >
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
                <DataNotFoundScreen onClick={clickFirstMessage} isPosition={false} icon={ENUM_KIND_OF_NOTFOUNDICON.MESSAGE} text="Nhấn để xin chào"></DataNotFoundScreen>
            }
        </div>
    )

}

export default ChatListScreen;
