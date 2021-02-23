import React from 'react';
import './current-chat.scss';

function CurrentChatScreen(props : any){

    return (
        <div className={"currentchat-container margin-4 "}>
            { props.children }
        </div>
    )
}

export default CurrentChatScreen;