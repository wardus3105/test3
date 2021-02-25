import React from 'react';
import './current-chat.scss';

function CurrentChatScreen(props : any){

    return (
        <div className={"currentchat-container"}>
            { props.children }
        </div>
    )
}

export default CurrentChatScreen;